package com.ssafy.alertyou.account.jwt;

public interface JwtProperties {
    String ISSUER = "alertyou";
    String SECRET = "dyAeHubOOc8KaOfYB6XEQoEj1QzRlVgtjNL8PYs1A1tymZvvqkcEU7L1imkKHeDa";
    long ACCESS_EXPIRATION_TIME = 1000 * 60 * 60 * 2L; // AccessToken 만료 2시간
    long REFRESH_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30L; // RefreshToken 만료 30일
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
