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
import com.ssafy.alertyou.util.Util;
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

import static com.ssafy.alertyou.util.Util.decodeToken;

@Service
@RequiredArgsConstructor
public class proofServiceImpl implements ProofService {
    private final ProofRepository proofRepository;
    private final Util util;
    private final S3Util s3Util;
    private final S3UtilByBase64 s3UtilByBase64;
    private final String IMAGE = "image";
    private final String AUDIO = "audio";
    private final String SUCCESS = "SUCCESS";
    private final String FAIL = "FAIL";
    public ResponseEntity<Map<String, Object>> uploadProof(String token, MultipartFile file) throws Exception{
        Map<String, Object> result = new HashMap<>();
        HttpStatus status;
        String type = new String();
        Boolean ctype = null;
        String endPoint = file.getContentType();
        User user = util.findUserByPhone(decodeToken(token));
        String uId = String.valueOf(user.getId());
        if (file.getContentType().contains("image")){
             type = IMAGE;
             ctype = true;
        }else if (file.getContentType().contains("audio")){
            type = AUDIO;
             ctype = false;
        }
        String url = s3Util.upload(file,type+"/"+uId);
        try {
            Long res = proofRepository.save(toEntity(user, url,ctype,endPoint)).getId();
            result.put("msg",SUCCESS);
            status = HttpStatus.CREATED;
        } catch (Exception e){
            result.put("msg",FAIL);
            result.put("error",e.getStackTrace());
            status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<>(result, status);
    }

    public ResponseEntity<Map<String, Object>> uploadProofByBase64(String token, ProofUploadReqDto file) throws Exception{
        Map<String, Object> result = new HashMap<>();
        HttpStatus status;
        String type = new String();
        Boolean ctype = null;
        User user = util.findUserByPhone(decodeToken(token));
        String uId = String.valueOf(user.getId());
        String orgFile = file.getFile();
        String[] seperateFile = orgFile.split(";");
        String point = seperateFile[0];
        String endPoint = point.substring(point.lastIndexOf('"')+1);
        String S3Point = endPoint.substring(endPoint.lastIndexOf("/")+1);
        String baseFile = seperateFile[1];
        System.out.println(baseFile.length());
        byte[] newFile = Base64.getMimeDecoder().decode(baseFile);
        if (endPoint.contains("image")){
            type = IMAGE;
            ctype = true;
        }else if (endPoint.contains("audio")){
            type = AUDIO;
            ctype = false;
        }
        String url = s3UtilByBase64.upload(newFile,S3Point,type+"/"+uId);
        try {
            Long res = proofRepository.save(toEntity(user, url,ctype,endPoint)).getId();
            result.put("msg",SUCCESS);
            status = HttpStatus.CREATED;
        } catch (Exception e){
            result.put("msg",FAIL);
            result.put("error",e.getStackTrace());
            status = HttpStatus.BAD_REQUEST;
        }
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

        User teacher = util.findUserByPhone(decodeToken(token));
        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();
        if (teacher.isActive() == true && teacher.getRole().equals("교사")){
            try {
                List<Proof> entityList = proofRepository.findAllByUserOrderByCreatedAtDesc(util.findUser(id));
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



}
