package com.ssafy.alertyou.account.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Component
public class JwtTokenProvider {

    public static JWTVerifier getVerifier() {
        return JWT
                .require(Algorithm.HMAC512(JwtProperties.SECRET.getBytes()))
                .withIssuer(JwtProperties.ISSUER)
                .build();
    }

    // 토큰의 만료 시간을 얻는 함수
    public static Date getTokenExpiration(long expirationTime) {
        Date now = new Date();
        return new Date(now.getTime() + expirationTime);
    }

    // JWT Access 토큰 발급
    public static String createAccessToken(String phone) {
        Date expiration = JwtTokenProvider.getTokenExpiration(JwtProperties.ACCESS_EXPIRATION_TIME);
        return JWT.create()
                .withSubject(phone)
                .withExpiresAt(expiration)
                .withIssuer(JwtProperties.ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(JwtProperties.SECRET.getBytes()));
    }

    // JWT Refresh 토큰 발급(함수 내용은 같지만, 함수명으로 access 토큰과 refresh 토큰을 구분함)
    public static String createRefreshToken(String phone) {
        Date expiration = JwtTokenProvider.getTokenExpiration(JwtProperties.REFRESH_EXPIRATION_TIME);
        return JWT.create()
                .withSubject(phone)
                .withExpiresAt(expiration)
                .withIssuer(JwtProperties.ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(JwtProperties.SECRET.getBytes()));
    }
    
}
