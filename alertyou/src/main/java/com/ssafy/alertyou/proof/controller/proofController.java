package com.ssafy.alertyou.proof.controller;

import com.ssafy.alertyou.proof.config.S3Util;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.ssafy.alertyou.proof.service.proofService;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/proof")
public class proofController {
    private String SUCCESS = "SUCCESS";
    private String FAIL = "FAIL";
    private final proofService proofService;
    private final S3Util s3Util;

    @PostMapping(value = "/upload")
    public ResponseEntity<Map<String, Object>> proofSave(@RequestPart MultipartFile mpart) throws Exception {
        System.out.println(mpart.getContentType());
        return getResponseEntity(s3Util.upload(mpart));
    }

    @GetMapping(value = "")
    public String proofs() throws Exception {
        return "hello";
    }

    public ResponseEntity<Map<String, Object>> getResponseEntity(Object obj) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus status;
        try {
            result.put("item", obj);
            result.put("msg", SUCCESS);
            status = HttpStatus.ACCEPTED;
        } catch (Exception e) {
            result.put("item", e.getMessage());
            result.put("msg", FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            e.printStackTrace();
        }
        return new ResponseEntity<>(result, status);
    }
    }
