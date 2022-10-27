package com.ssafy.alertyou.proof.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.proof.config.S3Util;
import com.ssafy.alertyou.proof.dto.ProofListResDto;
import com.ssafy.alertyou.proof.entity.Proof;
import com.ssafy.alertyou.proof.repository.ProofRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class proofServiceImpl implements proofService {
    private final S3Util s3Util;
    private final String IMAGE = "image";
    private final String AUDIO = "audio";
    private final String SUCCESS = "SUCCESS";
    private final String FAIL = "FAIL";
    private final ProofRepository proofRepository;
    private final UserRepository userRepository;
    public ResponseEntity<Map<String, Object>> uploadProof(long id, MultipartFile file) throws Exception{
        Map<String, Object> result = new HashMap<>();
        HttpStatus status;
        String type = new String();
        Boolean ctype = null;
        String endPoint = file.getContentType();
        if (file.getContentType().contains("image")){
             type = IMAGE;
             ctype = true;
        }else if (file.getContentType().contains("audio")){
             type = AUDIO;
             ctype = false;
        }
        String url = s3Util.upload(file,type);
        try {
            Long res = proofRepository.save(toEntity(findUser(id), url,ctype,endPoint)).getId();
            result.put("msg",SUCCESS);
            status = HttpStatus.CREATED;
        } catch (Exception e){
            result.put("mgs",FAIL);
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
        return s3Util.download(decodeUrl(key),proof.getEndPoint());
    }

    public ResponseEntity<Map<String, Object>> getProof(long id, long tId) throws Exception{
        User teacher = findUser(tId);
        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();
        if (teacher.isActive() == true && teacher.getRole().equals("teacher")){
            List<Proof> entityList = proofRepository.findAllByUserOrderByCreatedAtDesc(findUser(id));
            List<ProofListResDto> list = new ArrayList<>();
            for (Proof proof : entityList){
                list.add(new ProofListResDto(proof));
            }
            if (!list.isEmpty()){
                result.put("msg",SUCCESS);
                result.put("proofs", list);
                status = HttpStatus.OK;
            } else if(list.isEmpty()){
                result.put("mgs",FAIL);
                status = HttpStatus.BAD_REQUEST;
            }
        } else {
            result.put("msg",FAIL);
            status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(result, status);
    }

    public User checkProof(long id, MultipartFile file) throws Exception{
        return findUser(id);
    }

    public Proof toEntity(User user, String url, Boolean ctype, String endPoint){
        return Proof.builder()
                .user(user)
                .ctype(ctype)
                .url(url)
                .endPoint(endPoint)
                .createdAt(LocalDateTime.now())
                .build();
    }

    public Proof findProof(Long id){
        return proofRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Proof Not Found"));
    }

    public User findUser(long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Proof Not Found"));
    }

    public String decodeUrl(String url) throws UnsupportedEncodingException {
        return  URLDecoder.decode(url, "UTF-8");
    }

}
