package com.ssafy.alertyou.alert.service;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface AlertService {
    public ResponseEntity<Map<String, Object>> getAlertList(long id) throws Exception;
    public ResponseEntity<Map<String, Object>> modifyAlert(long id) throws Exception;
    public ResponseEntity<Map<String, Object>> modifyAlertList(long id) throws Exception;
}
