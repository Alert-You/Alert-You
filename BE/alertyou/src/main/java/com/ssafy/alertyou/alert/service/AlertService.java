package com.ssafy.alertyou.alert.service;

import com.ssafy.alertyou.report.dto.LocationReqDto;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface AlertService {
    public ResponseEntity<Map<String, Object>> getAlertList(String token) throws Exception;
    public ResponseEntity<Map<String, Object>> modifyAlert(long id) throws Exception;
    public ResponseEntity<Map<String, Object>> modifyAlertList(String token) throws Exception;
}
