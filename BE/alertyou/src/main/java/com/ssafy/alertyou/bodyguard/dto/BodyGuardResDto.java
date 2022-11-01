package com.ssafy.alertyou.bodyguard.dto;

import com.ssafy.alertyou.account.entity.User;
import lombok.Getter;

@Getter
public class BodyGuardResDto {
    private Long userId;
    private String userName;
    private String phone;

    public BodyGuardResDto(User entity){
        this.userId = entity.getId();
        this.userName = entity.getUsername();
        this.phone = entity.getPhone();
    }
}
