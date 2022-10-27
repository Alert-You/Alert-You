package com.ssafy.alertyou.proof.controller;

import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.ssafy.alertyou.proof.config.S3Util;
import com.ssafy.alertyou.proof.entity.Proof;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.ssafy.alertyou.proof.service.proofService;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/proof")
public class proofController {
    private final proofService proofService;
    private final S3Util s3Util;

    @PostMapping(value = "/upload")
    public ResponseEntity<Map<String, Object>> ProofUpload(@RequestPart("file") MultipartFile multipartFile, @RequestPart("user_id") long id) throws Exception {
        return proofService.uploadProof(id, multipartFile);
    }

    @GetMapping(value = "/download")
    public ResponseEntity<byte[]> ProofDownload(@RequestParam("proof_id") Long id ) throws IOException {
        return proofService.downloadProof(id);
    }


    }
