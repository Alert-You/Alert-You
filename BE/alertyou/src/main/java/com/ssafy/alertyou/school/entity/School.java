package com.ssafy.alertyou.school.entity;

import com.ssafy.alertyou.account.entity.User;
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
public class School {

    @Id
    @Column(name="school_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // 학교-유저 관계
    @OneToMany(mappedBy="school")
    private List<User> users = new ArrayList<>();

    private String name;
    private String region;
    private String address;
    private int grade; // 학년
    private String classRoom; // 반


}