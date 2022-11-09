package com.ssafy.alertyou.report.service;

import com.ssafy.alertyou.report.dto.ReportVictimReqDto;
import com.ssafy.alertyou.report.dto.ReportWitnessReqDto;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface ReportService {

    public ResponseEntity<Map<String, Object>> getReportList(long id) throws Exception;
    public ResponseEntity<Map<String, Object>> getReportDetail(long id) throws Exception;
    public ResponseEntity<Map<String, Object>> addReportVictim(String token, ReportVictimReqDto reportVictimReqDto) throws Exception;
    public ResponseEntity<Map<String, Object>> addReportWitness(String token, ReportWitnessReqDto reportWitnessReqDto) throws Exception;
}
