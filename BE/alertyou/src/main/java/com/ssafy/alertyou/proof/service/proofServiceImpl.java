package com.ssafy.alertyou.proof.service;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.jwt.JwtProperties;
import com.ssafy.alertyou.account.jwt.JwtTokenProvider;
import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.proof.config.S3Util;
import com.ssafy.alertyou.proof.config.S3UtilByBase64;
import com.ssafy.alertyou.proof.dto.ProofListResDto;
import com.ssafy.alertyou.proof.dto.ProofUploadReqDto;
import com.ssafy.alertyou.proof.entity.Proof;
import com.ssafy.alertyou.proof.repository.ProofRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLDecoder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class proofServiceImpl implements ProofService {
    private final S3Util s3Util;
    private final S3UtilByBase64 s3UtilByBase64;
    private final String IMAGE = "image";
    private final String AUDIO = "audio";
    private final String SUCCESS = "SUCCESS";
    private final String FAIL = "FAIL";
    private final ProofRepository proofRepository;
    private final UserRepository userRepository;
    public ResponseEntity<Map<String, Object>> uploadProof(String token, MultipartFile file) throws Exception{
        System.out.println("이건가1");
        Map<String, Object> result = new HashMap<>();
        System.out.println("이건가2");
        HttpStatus status;
        System.out.println("이건가3");
        String type = new String();
        System.out.println("이건가4");
        Boolean ctype = null;
        System.out.println("이건가5");
        String endPoint = file.getContentType();
        System.out.println("이건가6");
        User user = findUserByPhone(decodeToken(token));
        System.out.println("이건가7");
        String uId = String.valueOf(user.getId());
        System.out.println("이건가8");
        if (file.getContentType().contains("image")){
            System.out.println("이건가9");
             type = IMAGE;
            System.out.println("이건가10");
             ctype = true;
            System.out.println("이건가11");
        }else if (file.getContentType().contains("audio")){
            System.out.println("이건가12");
            type = AUDIO;
            System.out.println("이건가13");
             ctype = false;
        }
        System.out.println("이건가14");
        String url = s3Util.upload(file,type+"/"+uId);
        System.out.println("이건가15");
        try {
            System.out.println("이건가16");
            Long res = proofRepository.save(toEntity(user, url,ctype,endPoint)).getId();
            System.out.println("이건가17");
            result.put("msg",SUCCESS);
            System.out.println("이건가18");
            status = HttpStatus.CREATED;
            System.out.println("이건가19");
        } catch (Exception e){
            System.out.println("이건가20");
            result.put("msg",FAIL);
            System.out.println("이건가21");
            result.put("error",e.getStackTrace());
            System.out.println("이건가22");
            status = HttpStatus.BAD_REQUEST;
            System.out.println("이건가23");
        }
        System.out.println("이건가24");
        return new ResponseEntity<>(result, status);
    }

    public ResponseEntity<Map<String, Object>> uploadProofByBase64(String token, ProofUploadReqDto file) throws Exception{
        System.out.println("제발1");
        Map<String, Object> result = new HashMap<>();
        System.out.println("제발2");
        HttpStatus status;
        System.out.println("제발3");
        String type = new String();
        System.out.println("제발4");
        Boolean ctype = null;
        System.out.println("제발5");
        User user = findUserByPhone(decodeToken(token));
        System.out.println("제발6");
        String uId = String.valueOf(user.getId());
        System.out.println("제발7");
        String orgFile = file.getFile();
        String[] seperateFile = orgFile.split(";");
        System.out.println("제발8");
        String point = seperateFile[0];
        String endPoint = point.substring(point.lastIndexOf('"')+1);
        String S3Point = endPoint.substring(endPoint.lastIndexOf("/")+1);
        System.out.println("제발9");
        String baseFile = seperateFile[1];
        System.out.println("제발10");
        System.out.println(baseFile.length());
        System.out.println("제발11");
        byte[] newFile = Base64.getMimeDecoder().decode(baseFile);
        System.out.println("제발12");
        if (endPoint.contains("image")){
            type = IMAGE;
            ctype = true;
            System.out.println("제발13");
        }else if (endPoint.contains("audio")){
            type = AUDIO;
            ctype = false;
            System.out.println("제발14");
        }
        System.out.println("제발15");
        String url = s3UtilByBase64.upload(newFile,S3Point,type+"/"+uId);
        System.out.println("제발16");
        try {
            System.out.println("제발17");
            Long res = proofRepository.save(toEntity(user, url,ctype,endPoint)).getId();
            result.put("msg",SUCCESS);
            status = HttpStatus.CREATED;
        } catch (Exception e){
            System.out.println("제발18");
            result.put("msg",FAIL);
            result.put("error",e.getStackTrace());
            status = HttpStatus.BAD_REQUEST;
        }
        System.out.println("제발19");
        return new ResponseEntity<>(result, status);
    }


    public ResponseEntity<byte[]> downloadProof(Long id) throws IOException {
        Proof proof = findProof(id);
        String key = null;
        if (proof.getCtype().booleanValue() == true){
            key = proof.getUrl().substring(proof.getUrl().lastIndexOf("image"));
        } else if (proof.getCtype().booleanValue() == false) {
            key = proof.getUrl().substring(proof.getUrl().lastIndexOf("audio"));
        }
        String url = URLDecoder.decode(key, "UTF-8");
        return s3Util.download(url,proof.getEndPoint());
    }

    public ResponseEntity<Map<String, Object>> getProof(String token, long id) throws Exception{

        User teacher = findUserByPhone(decodeToken(token));
        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();
        if (teacher.isActive() == true && teacher.getRole().equals("teacher")){
            try {
                List<Proof> entityList = proofRepository.findAllByUserOrderByCreatedAtDesc(findUser(id));
                List<ProofListResDto> list = new ArrayList<>();
                for (Proof proof : entityList){
                    list.add(new ProofListResDto(proof));
                }

                result.put("msg",SUCCESS);
                result.put("proofs", list);
                status = HttpStatus.OK;
            } catch (Exception e){
                result.put("msg",FAIL);
                status = HttpStatus.BAD_REQUEST;
            }
        } else {
            result.put("msg",FAIL);
            status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(result, status);
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

    public Proof findProof(Long id){
        return proofRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Proof Not Found"));
    }

    public User findUser(long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User Not Found"));
    }

    public User findUserByPhone(String phone){
        return userRepository.findByPhone(phone);
    }

    public String decodeToken(String token) throws Exception{
        JWTVerifier jwtVerifier = JwtTokenProvider.getVerifier(); // 토큰 검증을 실시
        DecodedJWT decodedJWT = jwtVerifier.verify(token.replace(JwtProperties.TOKEN_PREFIX, "")); // 토큰에서 Bearer 를 제거함
        return decodedJWT.getSubject(); // 디코딩한 JWT 토큰에서 핸드폰 번호를 가져옴
    }

}
