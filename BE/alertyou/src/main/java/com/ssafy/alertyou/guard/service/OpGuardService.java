package com.ssafy.alertyou.guard.service;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface OpGuardService {
    public ResponseEntity<Map<String, Object>> getOpGuard(long id) throws Exception;
}
