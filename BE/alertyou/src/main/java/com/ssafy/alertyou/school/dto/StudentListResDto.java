package com.ssafy.alertyou.school.dto;

import com.ssafy.alertyou.account.entity.User;
import lombok.Getter;

@Getter
public class StudentListResDto {
    private long userId;
    private String name;
    private String phone;
    private Boolean isGuard;

    public StudentListResDto(User entity, Boolean isGuard){
        this.userId = entity.getId();
        this.name = entity.getUsername();
        this.phone = entity.getPhone();
        this.isGuard = isGuard;
    }
}
