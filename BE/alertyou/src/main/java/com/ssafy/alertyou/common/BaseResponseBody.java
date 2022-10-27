package com.ssafy.alertyou.common;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * 기본 응답 바디
 */
@Getter
@Setter
@ApiModel("BaseResponseBody")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BaseResponseBody {
    @ApiModelProperty(name="응답 메시지", example = "회원 가입 상태")
    String message = null;
    @ApiModelProperty(name="응답 코드", example = "200")
    Integer statusCode = null;

    public static BaseResponseBody result(Integer statusCode, String message) {
        BaseResponseBody res = new BaseResponseBody();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }

}
