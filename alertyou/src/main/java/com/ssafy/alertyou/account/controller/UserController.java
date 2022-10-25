package com.ssafy.alertyou.account.controller;

import com.ssafy.alertyou.account.dto.UserRequestDto;
import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.account.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;
    
    // 로그인
    @PostMapping("/login")
    public ResponseEntity<HashMap<String, Object>> login(@RequestBody UserRequestDto userRequestDto) {
        HttpStatus status ;
        status = HttpStatus.OK;
        HashMap<String, Object> jsonMap = new HashMap<>();

        return new ResponseEntity<>(jsonMap, status);
    }


    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<HashMap<String, Object>> logout() {
        HttpStatus status;
        status = HttpStatus.OK;
        HashMap<String, Object> jsonMap = new HashMap<>();

        return new ResponseEntity<>(jsonMap, status);
    }



    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<HashMap<String, Object>> signup(@RequestBody UserRequestDto userRequestDto) {
        HttpStatus status;
        HashMap<String, Object> jsonMap = new HashMap<>();
        try {
            boolean ret = userService.createUser(userRequestDto);
            if (ret) {
                jsonMap.put("msg", "회원 가입 성공");
                status = HttpStatus.CREATED;
            } else {
                jsonMap.put("msg", "회원 가입 실패");
                status = HttpStatus.OK;
            }
            jsonMap.put("result", ret);
        } catch (Exception e) {
            jsonMap.put("msg", "잘못된 요청입니다.");
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(jsonMap, status);
    }

    // 회원 탈퇴
    @DeleteMapping("/signout")
    public ResponseEntity<HashMap<String, Object>> signout() {
        HttpStatus status;
        status = HttpStatus.OK;
        HashMap<String, Object> jsonMap = new HashMap<>();

        return new ResponseEntity<>(jsonMap, status);
    }
    
    

}
