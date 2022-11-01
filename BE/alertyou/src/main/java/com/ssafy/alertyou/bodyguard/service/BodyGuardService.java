package com.ssafy.alertyou.bodyguard.service;

import com.ssafy.alertyou.bodyguard.dto.BodyGuardReqDto;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface BodyGuardService {
    public ResponseEntity<Map<String, Object>> getBodyGuard(long id) throws Exception;
    public ResponseEntity<Map<String, Object>> postBodyGuard(BodyGuardReqDto bodyGuardReqDto) throws Exception;
}
