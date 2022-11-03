package com.ssafy.alertyou.account.dto;

import com.ssafy.alertyou.common.BaseResponseBody;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoResDto extends BaseResponseBody {
    @ApiModelProperty(name="학교", example = "싸피 고등학교")
    private String schoolName;

    @ApiModelProperty(name="이름", example = "곽두팔")
    private String name;

    @ApiModelProperty(name="역할", example = "보디가드")
    private String role;

    @ApiModelProperty(name="휴대전화 번호", example = "01012345678")
    private String phone;

    public static UserInfoResDto result(Integer statusCode, String message, String schoolName, String name, String role, String phone) {
        UserInfoResDto ret = new UserInfoResDto();
        ret.setStatusCode(statusCode);
        ret.setName(name);
        ret.setRole(role);
        ret.setSchoolName(schoolName);
        ret.setMessage(message);
        ret.setPhone(phone);
        return ret;
    }
}
