package com.ssafy.alertyou.proof.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
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
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.time.LocalDateTime;
import java.util.HashMap;
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
            Long res = proofRepository.save(toEntity(url,ctype,endPoint)).getId();
            result.put("msg",SUCCESS);
            status = HttpStatus.CREATED;
        } catch (Exception e){
            result.put("mgs",FAIL);
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

    public Proof toEntity(String url, Boolean ctype, String endPoint){
        return Proof.builder()
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

    public String decodeUrl(String url) throws UnsupportedEncodingException {
        return  URLDecoder.decode(url, "UTF-8");
    }
}
