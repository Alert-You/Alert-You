package com.ssafy.alertyou.account.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Component
public class JwtTokenProvider {

    // 서명과 JWT형태가 올바른지 확인
    public static JWTVerifier getVerifier() {
        return JWT
                .require(Algorithm.HMAC512(JwtProperties.SECRET.getBytes()))
                .withIssuer(JwtProperties.ISSUER)
                .build();
    }

    // 토큰의 만료 시간을 설정하는
    public static Date setTokenExpiration(long expirationTime) {
        Date now = new Date();
        return new Date(now.getTime() + expirationTime);
    }

    // JWT Access 토큰 발급
    public static String createAccessToken(String phone) {
        Date expiration = JwtTokenProvider.setTokenExpiration(JwtProperties.ACCESS_EXPIRATION_TIME);
        return JWT.create()
                .withSubject(phone)
                .withExpiresAt(expiration)
                .withIssuer(JwtProperties.ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(JwtProperties.SECRET.getBytes()));
    }

    // JWT Refresh 토큰 발급(함수 내용은 같지만, 함수명으로 access 토큰과 refresh 토큰을 구분함)
    public static String createRefreshToken(String phone) {
        Date expiration = JwtTokenProvider.setTokenExpiration(JwtProperties.REFRESH_EXPIRATION_TIME);
        return JWT.create()
                .withSubject(phone)
                .withExpiresAt(expiration)
                .withIssuer(JwtProperties.ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(JwtProperties.SECRET.getBytes()));
    }

    // 토큰의 만료 시간을 검증
    public static boolean verifyTokenExpiration(String token) {
        JWTVerifier jwtVerifier = JwtTokenProvider.getVerifier();
        DecodedJWT decodedJWT = jwtVerifier.verify(token.replace(JwtProperties.TOKEN_PREFIX, ""));
        Date tokenExpiration = decodedJWT.getExpiresAt();
        return !tokenExpiration.before(new Date());
    }
    
}
