package com.ssafy.alertyou.guard.entity;

import com.ssafy.alertyou.account.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Coguard {

    @Id
    @Column(name="coguard_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // 공통 가드-유저 관계 추가
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "guard_id")
    private User coGuard;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "teacher_id")
    private User teacher;

}