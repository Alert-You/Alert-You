package com.ssafy.alertyou.school.service;
import com.ssafy.alertyou.account.dto.UserSignupReqDto;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.account.service.AuthRefreshTokenService;
import com.ssafy.alertyou.account.service.UserService;
import com.ssafy.alertyou.proof.entity.Proof;
import com.ssafy.alertyou.school.dto.SchoolSearchResDto;
import com.ssafy.alertyou.school.entity.School;
import com.ssafy.alertyou.school.repository.SchoolRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.*; // junit4??
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@SpringBootTest
public class SchoolServiceTest {
    @Autowired
    private SchoolRepository schoolRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SchoolService schoolService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthRefreshTokenService authRefreshTokenService;


    @AfterEach
    public void deleteClass(){
        userRepository.deleteAll();
        schoolRepository.deleteAll();
    }

    @Test
    @DisplayName("학교 검색 테스트")
    public void getSchoolList() throws Exception {
        schoolRepository.save(toEntity(1,"1"));
        schoolRepository.save(toEntity(2,"1"));
        schoolRepository.save(toEntity(3,"1"));

        List<SchoolSearchResDto> res =  schoolService.getSchools("싸피");
        assertThat(res.get(0).getName().contains("싸피"));
    }

    @Test
    @DisplayName("학교 반 정보 리스트 : 학교&주소")
    public void getClassesByNameAndAddress() throws Exception{
        schoolRepository.save(toEntity(1,"2"));
        schoolRepository.save(toEntity(2,"2"));
        schoolRepository.save(toEntity(3,"2"));

        ArrayList<ArrayList<String>> res =  schoolService.getGradesAndClasses(null,"싸피고등학교","덕명동");
        assertThat(res.size() == 4);
    }

    @Test
    @DisplayName("학교 반 정보 리스트 : 토큰")
    @Transactional
    public void getClassesByToken() throws Exception{
        School school = schoolRepository.save(toEntity(1,"3"));
        User teacher = userRepository.save(UserEntity("교사", "01000000000", school));
        String token = authRefreshTokenService.createAccessToken(teacher.getPhone());

        schoolRepository.save(toEntity(2,"3"));
        schoolRepository.save(toEntity(3,"3"));

        ArrayList<ArrayList<String>> res =  schoolService.getGradesAndClasses(token, null, null);
        assertThat(res.size()==4);
    }

    @Test
    @DisplayName("학교 번호 반환")
    @Transactional
    public void getSchoolId() throws Exception{
        Long id = schoolRepository.save(toEntity(1,"4")).getId();
        Long res =  schoolService.getSchoolsNumber("싸피고등학교","덕명동", 1, "4");
        assertThat(res.equals(id));
    }


    public User UserEntity(String role, String phone, School school){
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

    public School toEntity(int grade, String classRoom){
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
