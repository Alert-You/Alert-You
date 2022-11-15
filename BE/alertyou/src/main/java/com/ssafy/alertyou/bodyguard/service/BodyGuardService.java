package com.ssafy.alertyou.bodyguard.service;

import com.ssafy.alertyou.bodyguard.dto.BodyGuardResDto;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface BodyGuardService {
    public List<BodyGuardResDto> getBodyGuard(long id) throws Exception;
    public Long addBodyGuard(String token, long id) throws Exception;
}
