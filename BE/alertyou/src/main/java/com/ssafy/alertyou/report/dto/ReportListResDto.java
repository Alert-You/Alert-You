package com.ssafy.alertyou.report.dto;

import com.ssafy.alertyou.report.entity.Report;
import lombok.Getter;

@Getter
public class ReportListResDto {

    private long reportId;
    private String noticeDateTime;
    private Boolean isVictim;

    public ReportListResDto(Report entity){
        this.reportId = entity.getId();
        this.noticeDateTime = entity.getNoticeDateTime();
        this.isVictim = entity.getIsVictim();
    }

}
