package com.ssafy.alertyou.report.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@ApiModel("WitnessRequestDTO")
public class ReportWitnessReqDto {
    private long userId;
    private double latitude;
    private double longtitude;
    private String content;
    private String place;

}
