package com.ssafy.alertyou.account.service;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.alertyou.account.entity.AuthRefreshToken;
import com.ssafy.alertyou.account.jwt.JwtProperties;
import com.ssafy.alertyou.account.jwt.JwtTokenProvider;
import com.ssafy.alertyou.account.repository.AuthRefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@Service
@RequiredArgsConstructor
public class AuthRefreshTokenService {

    private final AuthRefreshTokenRepository authRefreshTokenRepository;

    public String createAccessToken(String phone) {
        return JwtTokenProvider.createAccessToken(phone);
    }


    // refresh토큰 생성(쿠키에 저장)
    public String createRefreshToken(String phone) {
        String refreshToken = JwtTokenProvider.createRefreshToken(phone);
        AuthRefreshToken authRefreshToken = AuthRefreshToken.builder()
                .refreshToken(refreshToken)
                .build();
        authRefreshTokenRepository.save(authRefreshToken);
//        Cookie cookie = new Cookie("refreshToken", refreshToken);
//        cookie.setMaxAge(60 * 60 * 24 * 30); // 쿠키의 유효 시간 설정 1초 단위 => 30일 30*24*60*60
//        cookie.setPath("/"); // 쿠키를 허용할 범위 /: 사이트의 모든 곳
//        cookie.setSecure(true); // 클라이언트가 https가 아닌 통신에서는 해당 쿠키를 전송하지 않도록 설정
//        cookie.setHttpOnly(true); // 브라우저에서 쿠키에 접근할 수 없도록 설정
        return refreshToken;
    }

    // 리프레시 토큰 조회
    public AuthRefreshToken getRefreshToken(String refreshToken) {
        return authRefreshTokenRepository.findByRefreshToken(refreshToken);
    }

    // 리프레시 토큰 삭제
    public void deleteRefreshToken(AuthRefreshToken refreshToken) {
        authRefreshTokenRepository.delete(refreshToken);
    }

    // 쿠키로부터 리프레시 토큰을 가져옴
    public String getRefreshTokenFromCookie(HttpServletRequest request){
        Cookie[] cookies = request.getCookies(); // 쿠키 배열을 가져옴
        if (cookies == null) {
            return null;
        }

        String refreshToken = null;

        for (Cookie cookie : cookies) {
            if ((cookie.getName()).equals("refreshToken")) {
                refreshToken = cookie.getValue();
            }
        }

        return refreshToken;
    }

    // 토큰으로부터 휴대전화 번호를 가져오는 메서드
    public String getPhoneFromToken(String token) {
        JWTVerifier jwtVerifier = JwtTokenProvider.getVerifier(); // 토큰 검증을 실시
        DecodedJWT decodedJWT = jwtVerifier.verify(token.replace(JwtProperties.TOKEN_PREFIX, ""));
        return decodedJWT.getSubject(); // 휴대전화 번호를 반환
    }

    public boolean getTokenExpiration(String token) {
        return JwtTokenProvider.verifyTokenExpiration(token);
    }
    
}
