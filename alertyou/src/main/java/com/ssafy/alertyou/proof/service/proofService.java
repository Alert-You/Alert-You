package com.ssafy.alertyou.proof.service;


import org.springframework.web.multipart.MultipartFile;

public interface proofService {
    public String addProof(MultipartFile mpart) throws Exception;
}
