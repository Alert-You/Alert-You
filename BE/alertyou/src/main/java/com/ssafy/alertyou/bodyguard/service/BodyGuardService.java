package com.ssafy.alertyou.bodyguard.service;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface BodyGuardService {
    public ResponseEntity<Map<String, Object>> getBodyGuard(long id) throws Exception;
}
