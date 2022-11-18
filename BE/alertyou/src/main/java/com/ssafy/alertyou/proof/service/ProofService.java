package com.ssafy.alertyou.proof.service;


import com.ssafy.alertyou.proof.dto.ProofListResDto;
import com.ssafy.alertyou.proof.dto.ProofUploadReqDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProofService {
    public Long uploadProof(String token, MultipartFile file) throws Exception;
    public ResponseEntity<byte[]> downloadProof(Long id) throws IOException;

    public List<ProofListResDto> getProof(String token, long id) throws Exception;
    public Long uploadProofByBase64(String token, ProofUploadReqDto file) throws Exception;

}
