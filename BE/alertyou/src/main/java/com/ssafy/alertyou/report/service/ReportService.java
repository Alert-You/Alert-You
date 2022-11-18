package com.ssafy.alertyou.report.service;

import com.ssafy.alertyou.report.dto.*;

import java.util.List;

public interface ReportService {

    public List<ReportListResDto> getReportList(long id) throws Exception;
    public ReportResDto getReportDetail(long id) throws Exception;
    public Long addReportVictim(String token, ReportVictimReqDto reportVictimReqDto) throws Exception;
    public Long addReportWitness(String token, ReportWitnessReqDto reportWitnessReqDto) throws Exception;
    public Long addFCMToken(String token, FCMReqDto fcmResDto) throws Exception;

}
