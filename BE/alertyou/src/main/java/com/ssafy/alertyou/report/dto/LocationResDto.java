package com.ssafy.alertyou.report.dto;

import com.ssafy.alertyou.common.BaseResponseBody;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationResDto extends BaseResponseBody {
    @ApiModelProperty(name="위치 정보", example = "(34153) 대전광역시 유성구 덕명동 동서대로 삼성화재 유성연수원")
    private String locationAddress;

    public static LocationResDto result(Integer statusCode, String message, String locationAddress) {
        LocationResDto ret = new LocationResDto();
        ret.setStatusCode(statusCode);
        ret.setMessage(message);
        ret.setLocationAddress(locationAddress);
        return ret;
    }


}
