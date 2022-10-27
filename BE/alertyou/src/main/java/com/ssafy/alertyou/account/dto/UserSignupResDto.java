package com.ssafy.alertyou.account.dto;

import com.ssafy.alertyou.common.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 회원가입 결과 Dto
 */
@Getter
@Setter
@ApiModel("UserSignupResponseDto")
public class UserSignupResDto extends BaseResponseBody {
    @ApiModelProperty(name="회원 가입 결과", example = "true")
    boolean signupRes;
    public static UserSignupResDto result(Integer statusCode, String message, boolean signupRes) {
        UserSignupResDto res = new UserSignupResDto();
        res.setSignupRes(signupRes);
        res.setMessage(message);
        res.setStatusCode(statusCode);
        return res;
    }
}
