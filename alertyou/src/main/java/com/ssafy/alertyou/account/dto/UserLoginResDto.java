package com.ssafy.alertyou.account.dto;

import com.ssafy.alertyou.common.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * 유저 로그인 응답 Dto
 */
@Getter
@Setter
@ApiModel("UserLoginResponseDto")
public class UserLoginResDto extends BaseResponseBody {
    @ApiModelProperty(name = "JWT access 인증 토큰", example = "asdqwdwqd12314...")
    String accessToken;

    public static UserLoginResDto result(Integer statusCode, String message, String accessToken) {
        UserLoginResDto res = new UserLoginResDto();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setAccessToken(accessToken);
        return res;
    }
}
