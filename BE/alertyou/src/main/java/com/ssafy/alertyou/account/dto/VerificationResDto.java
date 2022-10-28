package com.ssafy.alertyou.account.dto;

import com.ssafy.alertyou.common.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("VerificationResponseDto")
public class VerificationResDto extends BaseResponseBody {
    @ApiModelProperty(name="인증 번호 6자리", example = "548236")
    String certNumber;

    public static VerificationResDto result(Integer statusCode, String message, String certNumber) {
        VerificationResDto res = new VerificationResDto();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setCertNumber(certNumber);
        return res;
    }

}
