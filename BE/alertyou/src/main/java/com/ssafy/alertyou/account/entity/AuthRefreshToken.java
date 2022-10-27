package com.ssafy.alertyou.account.entity;

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
public class AuthRefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String refreshToken;

}
