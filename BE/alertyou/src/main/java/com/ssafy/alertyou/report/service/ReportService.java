package com.ssafy.alertyou.report.service;

import com.ssafy.alertyou.report.dto.FCMReqDto;
import com.ssafy.alertyou.report.dto.LocationReqDto;
import com.ssafy.alertyou.report.dto.ReportVictimReqDto;
import com.ssafy.alertyou.report.dto.ReportWitnessReqDto;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface ReportService {

    public ResponseEntity<Map<String, Object>> getReportList(long id) throws Exception;
    public ResponseEntity<Map<String, Object>> getReportDetail(long id) throws Exception;
    public ResponseEntity<Map<String, Object>> addReportVictim(String token, ReportVictimReqDto reportVictimReqDto) throws Exception;
    public ResponseEntity<Map<String, Object>> addReportWitness(String token, ReportWitnessReqDto reportWitnessReqDto) throws Exception;
    public ResponseEntity<Map<String, Object>> addFCMToken(String token, FCMReqDto fcmResDto) throws Exception;
//    public ResponseEntity<Map<String, Object>> sendFCM(String token) throws Exception;

}
