package com.ssafy.alertyou.guard.dto;

import com.ssafy.alertyou.account.entity.User;
import lombok.Getter;

@Getter
public class OpGuardResDto {
    private Long userId;

    private String userName;
    private String phone;

    public OpGuardResDto(User entity){
        this.userId = entity.getId();
        this.userName = entity.getUsername();
        this.phone = entity.getPhone();
    }
}
