package com.ssafy.alertyou.account.dto;

import com.ssafy.alertyou.common.BaseResponseBody;
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
    @ApiModelProperty(name = "Access 토큰", example = "eYasdqwdwqd12314...")
    String accessToken;

    @ApiModelProperty(name = "Refresh 토큰", example = "eYasdqwdwqd56789...")
    String refreshToken;

    public static UserLoginResDto result(Integer statusCode, String message, String accessToken, String refreshToken) {
        UserLoginResDto res = new UserLoginResDto();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setAccessToken(accessToken);
        res.setRefreshToken(refreshToken);
        return res;
    }
}
