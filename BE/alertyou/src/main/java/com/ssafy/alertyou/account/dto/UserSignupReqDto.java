package com.ssafy.alertyou.account.dto;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 유저 회원가입 요청 Dto
 */
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@ApiModel("UserSignupRequestDTO")
public class UserSignupReqDto {

    @ApiModelProperty(name="휴대전화 번호", example = "01012345678")
    private String phone;

    @ApiModelProperty(name="비밀번호", example = "your_password")
    private String password;

    @ApiModelProperty(name="사용자 이름", example = "박시원")
    private String username;
    // 학교 부분
//    private String school_name;
//    private int grade;
//    private int room;

}
