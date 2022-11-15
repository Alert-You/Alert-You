package com.ssafy.alertyou.report.service;

import com.ssafy.alertyou.report.dto.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface ReportService {

    public List<ReportListResDto> getReportList(long id) throws Exception;
    public ReportResDto getReportDetail(long id) throws Exception;
    public Long addReportVictim(String token, ReportVictimReqDto reportVictimReqDto) throws Exception;
    public Long addReportWitness(String token, ReportWitnessReqDto reportWitnessReqDto) throws Exception;
    public Long addFCMToken(String token, FCMReqDto fcmResDto) throws Exception;

}
