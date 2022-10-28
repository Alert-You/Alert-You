package com.ssafy.alertyou.proof.controller;

import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.proof.config.S3Util;
import com.ssafy.alertyou.proof.service.ProofService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/proof")
public class ProofController {
    private final ProofService proofService;
    private final S3Util s3Util;

    @PostMapping(value = "/upload")
    public ResponseEntity<Map<String, Object>> ProofUpload(@RequestHeader String token, @RequestPart("file") MultipartFile multipartFile) throws Exception {
        return proofService.uploadProof(token, multipartFile);
    }

    @GetMapping(value = "/download")
    public ResponseEntity<byte[]> ProofDownload(@RequestParam("proof_id") Long id ) throws IOException {
        return proofService.downloadProof(id);
    }

    @GetMapping(value = "")
    public ResponseEntity<Map<String, Object>> ProofList(@RequestHeader String token, @RequestParam("user_id") long id) throws Exception {
        return proofService.getProof(token, id);
    }


    }
