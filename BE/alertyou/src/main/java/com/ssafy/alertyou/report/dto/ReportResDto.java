package com.ssafy.alertyou.report.dto;

import com.ssafy.alertyou.report.entity.Report;
import lombok.Getter;

@Getter
public class ReportResDto {

    private long reportId;
    private String noticeDateTime;
    private String content;
    private Boolean isVictim;
    private double latitude;
    private double longitude;
    private String location;
    private String place;

    public ReportResDto(Report entity){
        this.reportId = entity.getId();
        this.noticeDateTime = entity.getNoticeDateTime();
        this.content = entity.getContent();
        this.isVictim = entity.getIsVictim();
        this.latitude = entity.getLatitude();
        this.longitude = entity.getLongitude();
        this.location = entity.getLocation();
        this.place = entity.getPlace();
    }

}
