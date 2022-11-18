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
        this.phone = PhoneChange(user.getPhone());
    }

    public String PhoneChange(String phone){
        StringBuffer change = new StringBuffer(phone);
        change.insert(3, "-");
        change.insert(8,"-");
        return change.toString();
    }
}
