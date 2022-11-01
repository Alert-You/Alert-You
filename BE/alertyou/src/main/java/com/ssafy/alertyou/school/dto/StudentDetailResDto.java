package com.ssafy.alertyou.school.dto;

import com.ssafy.alertyou.account.entity.User;
import lombok.Getter;

@Getter
public class StudentDetailResDto {
    private String school;
    private String name;
    private String role;
    private String phone;

    public StudentDetailResDto(User user,String school, String role){
        this.school =school;
        this.name = user.getUsername();
        this.role = role;
        this.phone = user.getPhone();
    }
}
