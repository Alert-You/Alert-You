package com.ssafy.alertyou.account.repository;

import com.ssafy.alertyou.account.entity.AuthRefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthRefreshTokenRepository extends JpaRepository<AuthRefreshToken, Long> {
    AuthRefreshToken findByRefreshToken(String refreshToken);
}
