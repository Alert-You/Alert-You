package com.ssafy.alertyou.proof.controller;

import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.proof.config.S3Util;
import com.ssafy.alertyou.proof.dto.ProofUploadReqDto;
import com.ssafy.alertyou.proof.service.ProofService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/proof")
public class ProofController {
    private final ProofService proofService;
    private final S3Util s3Util;

    @PostMapping(value = "/upload")
    public ResponseEntity<Map<String, Object>> ProofUpload(@RequestHeader(value = "Authorization") String token, @RequestBody MultipartFile file) throws Exception {
        System.out.println("test");
        System.out.println(file);
        return proofService.uploadProof(token, file);
    }

    @PostMapping(value = "/upload/test")
    public ResponseEntity<Map<String, Object>> ProofUploadToBase64(@RequestHeader(value = "Authorization") String token, @RequestBody ProofUploadReqDto file) throws Exception {
        System.out.println("base64");
        return proofService.uploadProofByBase64(token, file);
    }
    @GetMapping(value = "/download")
    public ResponseEntity<byte[]> ProofDownload(@RequestParam("proofId") Long id ) throws IOException {
        return proofService.downloadProof(id);
    }

    @GetMapping(value = "")
    public ResponseEntity<Map<String, Object>> ProofList(@RequestHeader(value = "Authorization") String token, @RequestParam("userId") long id) throws Exception {
        return proofService.getProof(token, id);
    }


    }
