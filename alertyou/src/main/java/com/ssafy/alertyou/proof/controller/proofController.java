package com.ssafy.alertyou.proof.controller;

import com.ssafy.alertyou.proof.config.S3Util;
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

//    @PostMapping(value = "/upload")
//    public ResponseEntity<Map<String, Object>> proofSave(@RequestPart MultipartFile mpart) throws Exception {
//        System.out.println(mpart.getContentType());
//        return getResponseEntity(s3Util.upload(mpart));
//    }
    @PostMapping(value = "/upload")
    public ResponseEntity<Map<String, Object>> ProofAdd(@RequestPart("file") MultipartFile multipartFile, @RequestPart("user_id") long id) throws Exception {
        return proofService.addProof(id, multipartFile); // test 폴더에 파일 생성
    }

    }
