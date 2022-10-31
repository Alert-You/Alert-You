package com.ssafy.alertyou.guard.entity;

import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.school.entity.School;
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
public class Opguard {

    @Id
    @Column(name="opguard_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // 추가 가드-유저 관계 추가
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "guard_id")
    private User opGuard;


}