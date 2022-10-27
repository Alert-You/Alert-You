package com.ssafy.alertyou.account.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 유저 로그인 요청 Dto
 */
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@ApiModel("UserLoginRequestDTO")
public class UserLoginReqDto {
    @ApiModelProperty(name="휴대전화 번호", example = "01012345678")
    private String phone;

    @ApiModelProperty(name="비밀번호", example = "your_password")
    private String password;
}
