package com.ssafy.alertyou.proof.service;


import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.proof.entity.Proof;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

public interface ProofService {
    public ResponseEntity<Map<String, Object>> uploadProof(String token, MultipartFile file) throws Exception;
    public ResponseEntity<byte[]> downloadProof(Long id) throws IOException;

    public ResponseEntity<Map<String, Object>> getProof(String token, long id) throws Exception;
    public ResponseEntity<Map<String, Object>> uploadProofByBase64(String token, String file) throws Exception;

}
