package com.ssafy.alertyou.util;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.jwt.JwtProperties;
import com.ssafy.alertyou.account.jwt.JwtTokenProvider;
import com.ssafy.alertyou.account.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;


@Component
@RequiredArgsConstructor
public class Util {

    private final UserRepository userRepository;
    private final static String SUCCESS = "SUCCESS";
    private final static String FAIL = "FAIL";
    public static String decodeToken(String token) throws Exception {
        JWTVerifier jwtVerifier = JwtTokenProvider.getVerifier(); // 토큰 검증을 실시
        DecodedJWT decodedJWT = jwtVerifier.verify(token.replace(JwtProperties.TOKEN_PREFIX, "")); // 토큰에서 Bearer 를 제거함
        return decodedJWT.getSubject(); // 디코딩한 JWT 토큰에서 핸드폰 번호를 가져옴
    }

     public User findUser(long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User Not Found"));
    }

    public User findUserByPhone(String phone){
        return userRepository.findByPhone(phone);
    }

    public static ResponseEntity<Map<String, Object>> getResponseEntity(String name, Object obj){
        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();
        if (obj != null || name.equals("success")){
            result.put("msg",SUCCESS);
            if (!name.equals("success")){
                result.put(name,obj);
            }
            status = HttpStatus.OK;
        }else if(obj == null){
            result.put("msg",FAIL);
            status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<>(result, status);
    }
}
