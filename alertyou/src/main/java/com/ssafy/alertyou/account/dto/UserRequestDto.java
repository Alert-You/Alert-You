package com.ssafy.alertyou.account.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Builder
public class UserRequestDto {
    private String phone;
    private String password;

    public UserRequestDto(String phone, String password) {
        this.phone = phone;
        this.password = password;
    }

}
