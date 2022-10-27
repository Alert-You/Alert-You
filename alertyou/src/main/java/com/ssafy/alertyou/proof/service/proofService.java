package com.ssafy.alertyou.proof.service;


import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.ssafy.alertyou.proof.entity.Proof;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

public interface proofService {
    public ResponseEntity<Map<String, Object>> uploadProof(long id, MultipartFile file) throws Exception;
    public ResponseEntity<byte[]> downloadProof(Long id) throws IOException;
}
