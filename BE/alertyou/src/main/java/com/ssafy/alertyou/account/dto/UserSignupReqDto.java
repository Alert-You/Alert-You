package com.ssafy.alertyou.account.dto;


import com.ssafy.alertyou.school.entity.School;
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
    
    @ApiModelProperty(name="학교 정보", example = "{학교이름: 싸피고, 지역: 대전, 주소: 봉명동, 학년: 3, 반: 1}")
    private School school;

}
