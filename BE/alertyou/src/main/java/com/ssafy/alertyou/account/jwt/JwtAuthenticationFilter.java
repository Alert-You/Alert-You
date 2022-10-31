package com.ssafy.alertyou.account.jwt;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.service.UserService;
import com.ssafy.alertyou.common.auth.AlertYouDetails;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * jwt 필터
 */
public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

    private UserService userService;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, UserService userService) {
        super(authenticationManager);
        this.userService = userService;
    }

    // jwt 토큰 헤더 인증 필터
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
//        System.out.println("필터 동작하니?");
        String header = request.getHeader(JwtProperties.HEADER_STRING); // Authorization--
        System.out.println(header);
        // 헤더가 null이거나, Bearer로 시작하지 않으면
        if (header == null || !header.startsWith(JwtProperties.TOKEN_PREFIX)) {
            chain.doFilter(request, response);
//            System.out.println("위에 if절 통과했니?");
            return;
        }
//        System.out.println("어 통과했음!");
        try {
            Authentication authentication = getAuthentication(request);
            SecurityContextHolder.getContext().setAuthentication(authentication); // SecurityContextHolder에 인증 정보를 저장
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }

        chain.doFilter(request, response);
    }

    @Transactional(readOnly = true)
    public Authentication getAuthentication(HttpServletRequest request) throws Exception {
        String token = request.getHeader(JwtProperties.HEADER_STRING);

        if (token != null) { // 토큰이 있으면
            JWTVerifier jwtVerifier = JwtTokenProvider.getVerifier(); // 토큰 검증을 실시
            DecodedJWT decodedJWT = jwtVerifier.verify(token.replace(JwtProperties.TOKEN_PREFIX, "")); // 토큰에서 Bearer 를 제거함
            String phone = decodedJWT.getSubject(); // 디코딩한 JWT 토큰에서 핸드폰 번호를 가져옴
            if (phone != null) { // 핸드폰 번호가 null이 아닐 경우
                User user = userService.getUserByPhone(phone); // 핸드폰 번호로 유저 정보를 가져옴
                if (user != null) {
                    // 식별된 정상 유저일 경우에 진행
                    AlertYouDetails alertYouDetails = new AlertYouDetails(user);
                    UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(phone, null, alertYouDetails.getAuthorities());
                    return jwtAuthentication;
                }
            }
            return null;
        }
        return null;
    }
}
