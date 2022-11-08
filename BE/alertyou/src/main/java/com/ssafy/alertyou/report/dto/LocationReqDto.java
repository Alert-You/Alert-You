package com.ssafy.alertyou.report.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("LocationRequestDto")
public class LocationReqDto {
    @ApiModelProperty(name="경도", example = "127.29983")
    private double longitude; // 경도(longitude): 세로선(x축)

    @ApiModelProperty(name="위도", example = "36.35599")
    private double latitude; // 위도(latitude): 가로선(y축)
}
