package com.ssafy.alertyou.account.service;

import com.ssafy.alertyou.account.entity.AuthRefreshToken;
import com.ssafy.alertyou.account.jwt.JwtTokenProvider;
import com.ssafy.alertyou.account.repository.AuthRefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthRefreshTokenService {

    private final AuthRefreshTokenRepository authRefreshTokenRepository;

    // refresh토큰 생성(저장)
    public void saveRefreshToken(String phone) {
        String refreshToken = JwtTokenProvider.createRefreshToken(phone);
        AuthRefreshToken authRefreshToken = AuthRefreshToken.builder()
                .refreshToken(refreshToken)
                .build();
        authRefreshTokenRepository.save(authRefreshToken);
    }

}
