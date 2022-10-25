package com.ssafy.alertyou.proof.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.proof.config.S3Util;
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
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class proofServiceImpl implements proofService {
    private final S3Util s3Util;
    private final String IMAGE = "image";
    private final String RECORD = "record";
    private final String SUCCESS = "SUCCESS";
    private final String FAIL = "FAIL";
    private final ProofRepository proofRepository;
    public ResponseEntity<Map<String, Object>> addProof(long id, MultipartFile file) throws Exception{
        Map<String, Object> result = new HashMap<>();
        HttpStatus status;
        String type = new String();
        Boolean ctype = null;
        if (file.getContentType().contains("image")){
             type = IMAGE;
             ctype = true;
        }else if (file.getContentType().contains("audio")){
             type = RECORD;
             ctype = false;
        }
        String url = s3Util.upload(file,type);
        try {
            Long res = proofRepository.save(toEntity(url,ctype)).getId();
            result.put("msg",SUCCESS);
            status = HttpStatus.CREATED;
        } catch (Exception e){
            result.put("mgs",FAIL);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(result, status);
    }

    public Proof toEntity(String url, Boolean ctype){
        return Proof.builder()
                .ctype(ctype)
                .url(url)
                .createdAt(LocalDateTime.now())
                .build();
    }

}
