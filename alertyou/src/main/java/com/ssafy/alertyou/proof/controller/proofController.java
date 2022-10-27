package com.ssafy.alertyou.proof.controller;

import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.proof.config.S3Util;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.ssafy.alertyou.proof.service.proofService;

import java.io.IOException;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/proof")
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

    @GetMapping(value = "")
    public ResponseEntity<Map<String, Object>> ProofList(@RequestParam("student_id") long id, @RequestParam("teacher_id") long tId ) throws Exception {
        return proofService.getProof(id,tId);
    }
    @PostMapping(value = "")
    public User ProofCheck(@RequestPart("file") MultipartFile multipartFile, @RequestPart("user_id") long id) throws Exception {
        return proofService.checkProof(id, multipartFile);
    }


    }
