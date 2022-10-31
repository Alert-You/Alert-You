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

    public String createAccessToken(String phone) {
        return JwtTokenProvider.createAccessToken(phone);
    }


    // refresh토큰 생성(저장)
    public String createRefreshToken(String phone) {
        String refreshToken = JwtTokenProvider.createRefreshToken(phone);
        AuthRefreshToken authRefreshToken = AuthRefreshToken.builder()
                .refreshToken(refreshToken)
                .build();
        authRefreshTokenRepository.save(authRefreshToken);
        return refreshToken;
    }

    // 리프레시 토큰 조회
    public AuthRefreshToken getRefreshToken(String refreshToken) {
        return authRefreshTokenRepository.findByRefreshToken(refreshToken);
    }

    public void deleteRefreshToken(AuthRefreshToken refreshToken) {
        authRefreshTokenRepository.delete(refreshToken);
    }

}
