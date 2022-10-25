package com.ssafy.alertyou.proof.service;


import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface proofService {
    public ResponseEntity<Map<String, Object>> addProof(long id, MultipartFile file) throws Exception;
}
