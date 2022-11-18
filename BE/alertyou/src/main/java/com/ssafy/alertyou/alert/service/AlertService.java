package com.ssafy.alertyou.alert.service;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface AlertService {
    public ResponseEntity<Map<String, Object>> getAlertList(String token) throws Exception;
    public Long modifyAlert(long id) throws Exception;
    public Long modifyAlertList(String token) throws Exception;
}
