package com.ssafy.alertyou.alert.dto;

import com.ssafy.alertyou.alert.entity.Alert;
import com.ssafy.alertyou.report.entity.Report;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class AlertResDto {

    private long alertId;
    private long reportId;
    private String noticeDateTime;
    private Boolean isVictim;

    public AlertResDto(Report entity, Alert entityAlert){
        this.alertId = entityAlert.getId();
        this.reportId = entity.getId();
        this.noticeDateTime = entity.getNoticeDateTime();
        this.isVictim = entity.getIsVictim();
    }

}
