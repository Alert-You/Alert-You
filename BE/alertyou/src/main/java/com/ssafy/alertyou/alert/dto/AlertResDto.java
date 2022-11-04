package com.ssafy.alertyou.alert.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class AlertResDto {

    private long reportId;
    private String noticeDateTime;
    private Boolean IsVictim;

}
