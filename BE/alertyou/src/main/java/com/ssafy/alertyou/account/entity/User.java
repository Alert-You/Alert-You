package com.ssafy.alertyou.account.entity;

import com.ssafy.alertyou.account.dto.UserSignupReqDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long id;

//    @OneToMany(mappedBy = "user")
//    private List<Bodygaurd> bodygaurdList = new ArrayList<>();
//
//    @OneToOne
//    @JoinColumn(name = "school_id")
//    private School school;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String phone;

//    private String social;

    private boolean active;

    public void updateAccount(UserSignupReqDto userSignupReqDto, String newPassword) { // 회원 수정 메서드
        this.phone = userSignupReqDto.getPhone();
        this.active = true;
        this.role = "student";
        this.username = userSignupReqDto.getUsername();
        this.password = newPassword;
    }

    public void deleteAccount() { // active를 바꾸는 메서드 setter사용을 피하기 위함
        this.active = false;
    }
}
