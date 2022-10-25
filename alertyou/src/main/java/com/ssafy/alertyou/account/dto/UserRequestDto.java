package com.ssafy.alertyou.account.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class UserRequestDto {

    private String phone;
    private String password;
    private String username;
    // 학교 부분
//    private String school_name;
//    private int grade;
//    private int room;

}
