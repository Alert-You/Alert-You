package com.ssafy.alertyou.proof.service;


import com.amazonaws.services.s3.model.S3ObjectInputStream;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

public interface proofService {
    public ResponseEntity<Map<String, Object>> addProof(long id, MultipartFile file) throws Exception;
    public S3ObjectInputStream downloadProof(Long id) throws IOException;
}
