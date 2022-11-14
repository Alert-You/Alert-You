package com.ssafy.alertyou.proof.service;

import com.ssafy.alertyou.account.dto.UserSignupReqDto;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.account.service.AuthRefreshTokenService;
import com.ssafy.alertyou.account.service.UserService;
import com.ssafy.alertyou.proof.config.S3Util;
import com.ssafy.alertyou.proof.dto.ProofListResDto;
import com.ssafy.alertyou.proof.entity.Proof;
import com.ssafy.alertyou.proof.repository.ProofRepository;
import com.ssafy.alertyou.school.entity.School;
import com.ssafy.alertyou.school.repository.SchoolRepository;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.*; // junit4??
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.transaction.Transactional;
import java.io.*;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@SpringBootTest
public class ProofServiceTest {

    @Autowired
    private ProofRepository proofRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SchoolRepository schoolRepository;
    @Autowired
    private AuthRefreshTokenService authRefreshTokenService;

    @Autowired
    private ProofService proofService;

    @Autowired
    private UserService userService;

    @Autowired
    private S3Util s3Util;


    @AfterEach
    public void delete(){
        proofRepository.deleteAll();
    }

//    @BeforeEach
//    public void create(){
//        UserSignupReqDto userSignupReqDto = new UserSignupReqDto("01029128780", "asd123", "김애리", 1L);
//        userService.createUser(userSignupReqDto);
//        User user = userService.getUserByPhone(userSignupReqDto.getPhone());
//    }
    @AfterEach
    public void deleteClass(){
        userRepository.deleteAll();
        schoolRepository.deleteAll();
        proofRepository.deleteAll();
    }

    @Test
    @DisplayName("증거 업로드 테스트")
    @Transactional
    public void uploadProof() throws Exception {
        School school = schoolRepository.save(toSchool(1,"1"));
        User teacher = userRepository.save(toUser("교사", "01000000000", school));
        String token = authRefreshTokenService.createAccessToken(teacher.getPhone());
        // given

        File file = new File("C:/Users/multicampus/Desktop/peach.png");
        String endPonint = "peach.png";


        FileItem fileItem = (FileItem) new DiskFileItem("file"
                , Files.probeContentType(file.toPath())
                , false, file.getName()
                , (int) file.length(),
                file.getParentFile());

            InputStream is = new FileInputStream(file);
            OutputStream os = fileItem.getOutputStream();
            IOUtils.copy(is, os);


        CommonsMultipartFile multipartFile = new CommonsMultipartFile(fileItem);

        // when
        Long res =  proofService.uploadProof(token, multipartFile);
        // then
        assertThat(multipartFile.getOriginalFilename().equals(endPonint));
    }

    @Test
    @DisplayName("증거 다운로드 테스트")
    public void downloadProof() throws Exception {
        School school = schoolRepository.save(toSchool(1,"1"));
        User teacher = userRepository.save(toUser("교사", "01000000000", school));
        String token = authRefreshTokenService.createAccessToken(teacher.getPhone());
        // given

        File file = new File("C:/Users/multicampus/Desktop/peach.png");


        FileItem fileItem = (FileItem) new DiskFileItem("file"
                , Files.probeContentType(file.toPath())
                , false, file.getName()
                , (int) file.length(),
                file.getParentFile());

        InputStream is = new FileInputStream(file);
        OutputStream os = fileItem.getOutputStream();
        IOUtils.copy(is, os);


        CommonsMultipartFile multipartFile = new CommonsMultipartFile(fileItem);

        String type = new String();
        Boolean ctype = null;
        String endPoint = multipartFile.getContentType();
        String uId = String.valueOf(teacher.getId());
        if (multipartFile.getContentType().contains("image")){
            type = "image";
            ctype = true;
        }else if (multipartFile.getContentType().contains("audio")){
            type = "audio";
            ctype = false;
        }
        String url = s3Util.upload(multipartFile,type+"/"+uId);


        Long id = proofRepository.save(toEntity(teacher, url,ctype,endPoint)).getId();

        // when
        byte[] bytes = multipartFile.getBytes();
        byte[] newbyte = proofService.downloadProof(id).getBody();
        assertThat(bytes.equals(newbyte));
    }

    @Test
    @DisplayName("증거 조회 테스트")
    @Transactional
    public void proofList() throws Exception{
        School school = schoolRepository.save(toSchool(1,"1"));
        User user = userRepository.save(toUser("교사", "01000000000", school));
        String token = authRefreshTokenService.createAccessToken(user.getPhone());

        File file = new File("C:/Users/multicampus/Desktop/peach.png");
        FileItem fileItem = (FileItem) new DiskFileItem("file"
                , Files.probeContentType(file.toPath())
                , false, file.getName()
                , (int) file.length(),
                file.getParentFile());

        InputStream is = new FileInputStream(file);
        OutputStream os = fileItem.getOutputStream();
        IOUtils.copy(is, os);
        CommonsMultipartFile multipartFile = new CommonsMultipartFile(fileItem);

        String type = new String();
        Boolean ctype = null;
        String endPoint = multipartFile.getContentType();
        String uId = String.valueOf(user.getId());
        if (multipartFile.getContentType().contains("image")){
            type = "image";
            ctype = true;
        }else if (multipartFile.getContentType().contains("audio")){
            type = "audio";
            ctype = false;
        }
        String url = s3Util.upload(multipartFile,type+"/"+uId);


        Long id = proofRepository.save(toEntity(user, url,ctype,endPoint)).getId();

        List<ProofListResDto> res = proofService.getProof(token,user.getId());
        assertThat(res.get(0).getProofId() == id);
    }

    public User toUser(String role, String phone, School school){
        return User.builder()
                .school(school)
                .users(new ArrayList<>())
                .opGuards(new ArrayList<>())
                .teachers(new ArrayList<>())
                .coGuards(new ArrayList<>())
                .reUsers(new ArrayList<>())
                .userList(new ArrayList<>())
                .password("0000")
                .role(role)
                .username("test")
                .phone(phone)
                .active(true)
                .build();
    }
    public Proof toEntity(User user, String url, Boolean ctype, String endPoint){
        return Proof.builder()
                .user(user)
                .ctype(ctype)
                .url(url)
                .endPoint(endPoint)
                .createdAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")).toString())
                .build();
    }
    public School toSchool(int grade, String classRoom){
        return School.builder()
                .address("덕명동")
                .classRoom(classRoom)
                .grade(grade)
                .name("싸피고등학교")
                .region("대전")
                .users(new ArrayList<>())
                .build();
    }




}

