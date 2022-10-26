package com.ssafy.alertyou.account.controller;

import com.ssafy.alertyou.account.dto.UserLoginReqDto;
import com.ssafy.alertyou.account.dto.UserLoginResDto;
import com.ssafy.alertyou.account.dto.UserSignupReqDto;
import com.ssafy.alertyou.account.dto.UserSignupResDto;
import com.ssafy.alertyou.account.entity.AuthRefreshToken;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.jwt.JwtTokenProvider;
import com.ssafy.alertyou.account.service.AuthRefreshTokenService;
import com.ssafy.alertyou.account.service.UserService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;

@Api(value = "회원 관리 API", tags = {"auth"})
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final AuthRefreshTokenService authRefreshTokenService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    // 로그인
    @ApiOperation(value = "로그인", notes = "휴대전화 번호와 비밀번호를 입력하여 로그인을 한다.")
    @PostMapping("/login")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
//            @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
//            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
//            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
//    })
    public ResponseEntity<UserLoginResDto> login(@RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginReqDto userLoginReqDto) {
        HttpStatus status ;
        String phone = userLoginReqDto.getPhone();
        String password = userLoginReqDto.getPassword();
        User user = userService.getUserByPhone(phone);
        
        // 로그인 요청한 유저가 DB에 존재하지 않으면 404 리턴
        if (user == null) {
            return ResponseEntity.status(404).body(UserLoginResDto.result(404, "해당 유저가 없습니다.", null));
        }

        // 로그인 요청 시 입력한 패스워드가 DB의 패스워드와 일치한다면 로그인 성공
        if (bCryptPasswordEncoder.matches(password, user.getPassword())) {
            authRefreshTokenService.saveRefreshToken(phone);
            // 쿠키에 대한 추가 작업 필요
            // 엑세스 토크과 함께 로그인 결과 반환
            return ResponseEntity.ok().body(UserLoginResDto.result(200, "로그인 성공", JwtTokenProvider.createAccessToken(phone)));
        }

        return ResponseEntity.status(401).body(UserLoginResDto.result(401, "잘못된 비밀번호", null));
    }


    // 로그아웃
    @ApiOperation(value = "로그 아웃", notes = "로그 아웃을 한다.")
    @PostMapping("/logout")
    public ResponseEntity<HashMap<String, Object>> logout() {
        HttpStatus status;
        status = HttpStatus.OK;
        HashMap<String, Object> jsonMap = new HashMap<>();

        return new ResponseEntity<>(jsonMap, status);
    }


    // 회원가입
    @ApiOperation(value = "회원 가입", notes = "휴대전화 번호, 이름, 비밀번호를 입력하여 회원 가입을 한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "회원 가입 성공", response = UserSignupResDto.class),
            @ApiResponse(code = 400, message = "회원 가입 실패"),
            @ApiResponse(code = 404, message = "404 NOT FOUND")
    })
    @PostMapping("/signup")
    public ResponseEntity<UserSignupResDto> signup(@RequestBody @ApiParam(value="회원가입 입력 정보", required = true) UserSignupReqDto userRequestDto) {
        HttpStatus status;
        boolean ret;
        String msg = "";
        try {
            ret = userService.createUser(userRequestDto);
            if (ret) {
                msg = "회원 가입 성공";
                status = HttpStatus.CREATED;
            } else {
                msg = "회원 가입 실패";
                status = HttpStatus.BAD_REQUEST;
            }
        } catch (Exception e) {
            ret = false;
            msg = "잘못된 요청입니다.";
            status = HttpStatus.NOT_FOUND;
        }

        return ResponseEntity.status(status).body(UserSignupResDto.result(status.value(), msg, ret));
    }

    // 회원 탈퇴(DB에서 삭제 처리하지 않고 active를 false 처리함)
    @ApiOperation(value = "회원 탈퇴", notes = "회원 탈퇴한다.")
    @DeleteMapping("/signout")
    public ResponseEntity<HashMap<String, Object>> signout() {
        HttpStatus status;
        status = HttpStatus.OK;
        HashMap<String, Object> jsonMap = new HashMap<>();

        return new ResponseEntity<>(jsonMap, status);
    }



}

