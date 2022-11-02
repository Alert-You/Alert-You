package com.ssafy.alertyou.account.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.alertyou.account.dto.UserSignupReqDto;
import com.ssafy.alertyou.bodyguard.entity.Coguard;
import com.ssafy.alertyou.bodyguard.entity.Opguard;
import com.ssafy.alertyou.report.entity.Report;
import com.ssafy.alertyou.school.entity.School;
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
    
    // 학교-유저 관계 추가
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = School.class)
    @JoinColumn(name = "school_id")
    @JsonIgnore
    private School school;

    // 추가 가드-유저 관계
    @OneToMany(mappedBy="user")
    private List<Opguard> users = new ArrayList<>();

    @OneToMany(mappedBy="opGuard")
    private List<Opguard> opGuards = new ArrayList<>();

    // 공통 가드-유저 관계 추가
    @OneToMany(mappedBy="user")
    private List<Coguard> teachers = new ArrayList<>();

    @OneToMany(mappedBy="coGuard")
    private List<Coguard> coGuards = new ArrayList<>();

    // 신고-유저 관계
    @OneToMany(mappedBy="reUser")
    private List<Report> reUsers = new ArrayList<>();

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String phone;

    private boolean active;

    public void updateAccount(UserSignupReqDto userSignupReqDto, School school, String newPassword) { // 회원 수정 메서드(setter 사용을 피하기 위함)
        this.phone = userSignupReqDto.getPhone();
        this.school = school;
        this.active = true;
        this.role = "student";
        this.username = userSignupReqDto.getUsername();
        this.password = newPassword;
    }

    public void deleteAccount() { // 회원 탈퇴(active를 바꾸는 메서드, setter사용을 피하기 위함)
        this.active = false;
    }
}
