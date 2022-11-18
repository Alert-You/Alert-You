package com.ssafy.alertyou.report.dto;

import com.ssafy.alertyou.common.BaseResponseBody;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationResDto extends BaseResponseBody {
    @ApiModelProperty(name="우편 번호", example = "(34153)")
    private String zipCode;

    @ApiModelProperty(name="도로명 주소", example = "(34153) 대전 유성구 동서대로 98-39")
    private String roadAddress;

    @ApiModelProperty(name="지번", example = "덕명동 124")
    private String address;

    public static LocationResDto result(Integer statusCode, String message, String zipCode, String roadAddress, String address) {
        LocationResDto ret = new LocationResDto();
        ret.setStatusCode(statusCode);
        ret.setMessage(message);
        ret.setZipCode(zipCode);
        ret.setRoadAddress(roadAddress);
        ret.setAddress(address);
        return ret;
    }


}
