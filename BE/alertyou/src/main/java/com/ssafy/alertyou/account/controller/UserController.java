package com.ssafy.alertyou.account.controller;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.alertyou.account.dto.UserLoginReqDto;
import com.ssafy.alertyou.account.dto.UserLoginResDto;
import com.ssafy.alertyou.account.dto.UserSignupReqDto;
import com.ssafy.alertyou.account.dto.UserSignupResDto;
import com.ssafy.alertyou.account.entity.AuthRefreshToken;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.jwt.JwtProperties;
import com.ssafy.alertyou.account.jwt.JwtTokenProvider;
import com.ssafy.alertyou.account.repository.AuthRefreshTokenRepository;
import com.ssafy.alertyou.account.service.AuthRefreshTokenService;
import com.ssafy.alertyou.account.service.UserService;
import com.ssafy.alertyou.common.BaseResponseBody;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "휴대전화 번호와 비밀번호를 입력하여 로그인을 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginResDto.class),
            @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<UserLoginResDto> login(@RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginReqDto userLoginReqDto, HttpServletResponse response) {
        String phone = userLoginReqDto.getPhone();
        String password = userLoginReqDto.getPassword();
        User user = userService.getUserByPhone(phone);

        // 로그인 요청한 유저가 DB에 존재하지 않거나 active가 아니면 404 리턴
        if (user == null || !user.isActive()) {
            return ResponseEntity.status(404).body(UserLoginResDto.result(404, "해당 유저가 없습니다.", null));
        }

        // 로그인 요청 시 입력한 패스워드가 DB의 패스워드와 일치한다면 로그인 성공
        if (bCryptPasswordEncoder.matches(password, user.getPassword())) {
            String refreshToken = authRefreshTokenService.createRefreshToken(phone); // 리프레시 토큰 생성
            Cookie cookie = new Cookie("refreshToken", refreshToken);
            cookie.setMaxAge(60 * 60 * 24 * 30); // 쿠키의 유효 시간 설정 1초 단위 => 30일 30*24*60*60
            cookie.setPath("/"); // 쿠키를 허용할 범위 /: 사이트의 모든 곳
            cookie.setSecure(true); // 클라이언트가 https가 아닌 통신에서는 해당 쿠키를 전송하지 않도록 설정
            cookie.setHttpOnly(true); // 브라우저에서 쿠키에 접근할 수 없도록 설정
            response.addCookie(cookie); // 쿠기를 담아서 반환
            
            // 엑세스 토큰과 함께 로그인 결과 반환
            String accessToken = JwtTokenProvider.createAccessToken(phone);
//            response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + accessToken);
            return ResponseEntity.ok().body(UserLoginResDto.result(200, "로그인 성공", accessToken));
        }

        return ResponseEntity.status(401).body(UserLoginResDto.result(401, "잘못된 비밀번호", null));
    }


    // 로그아웃
    @PostMapping("/logout")
    @ApiOperation(value = "로그 아웃", notes = "로그 아웃을 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그 아웃 성공"),
            @ApiResponse(code = 401, message = "인가된 사용자 아님"),
            @ApiResponse(code = 404, message = "404 NOT FOUND")
    })
    public ResponseEntity<BaseResponseBody> logout(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = null;
        Cookie[] cookies = request.getCookies(); // 쿠키 배열을 가져옴
        if (cookies == null) {
            return ResponseEntity.status(404).body(BaseResponseBody.result(404, "쿠키가 없습니다."));
        }

        for (Cookie cookie : cookies) {
            if ((cookie.getName()).equals("refreshToken")) {
                refreshToken = cookie.getValue();
            }
        }
        AuthRefreshToken authRefreshToken = authRefreshTokenService.getRefreshToken(refreshToken);

        if (authRefreshToken != null) { // DB에 리프레시 토큰이 있으면 삭제, 쿠키를 초기화하고 로그아웃
            authRefreshTokenService.deleteRefreshToken(authRefreshToken);
            Cookie cookie = new Cookie("refreshToken", null); // 리프레시 토큰 초기화
            cookie.setMaxAge(0); // 쿠키 유효 기간 초기화
            cookie.setPath("/");
            response.addCookie(cookie);
            return ResponseEntity.status(200).body(BaseResponseBody.result(200, "로그 아웃 성공"));
        }

        return ResponseEntity.status(401).body(BaseResponseBody.result(401, "토큰이 유효하지 않습니다."));
    }


    // 회원가입
    @PostMapping("/signup")
    @ApiOperation(value = "회원 가입", notes = "휴대전화 번호, 이름, 비밀번호를 입력하여 회원 가입을 한다.")
    @ApiResponses({
//            @ApiResponse(code = 201, message = "회원 가입 성공", response = UserSignupResDto.class),
            @ApiResponse(code = 400, message = "회원 가입 실패"),
            @ApiResponse(code = 404, message = "404 NOT FOUND")
    })
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
    @DeleteMapping("/signout")
    @ApiOperation(value = "회원 탈퇴", notes = "휴대전화 번호, 이름, 비밀번호를 입력, 확인한 뒤 탈퇴한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "회원 탈퇴 성공"),
            @ApiResponse(code = 400, message = "회원 탈퇴 실패"),
            @ApiResponse(code = 404, message = "404 NOT FOUND")
    })
    public ResponseEntity<BaseResponseBody> signout(@RequestBody @ApiParam(value="로그인 입력 정보", required = true) UserLoginReqDto userLoginReqDto) {
        User user = userService.getUserByPhone(userLoginReqDto.getPhone());
        // 사용자가 없으면
        if (user == null) {
            return ResponseEntity.status(404).body(BaseResponseBody.result(404, "해당 유저는 존재하지 않습니다."));
        }

        // 비밀번호가 일치하면 탈퇴 처리(그냥 Delete할 것인가 DB에 남길 것인가) // 일단 삭제 => s3에 데이터가 남아 있고 뽑아올 수 있다면 탈퇴처리해도됨
        if (bCryptPasswordEncoder.matches(userLoginReqDto.getPassword(), user.getPassword())) {
            userService.removeUser(user);
            return ResponseEntity.status(200).body(BaseResponseBody.result(200, "회원 탈퇴 처리 성공"));
        }

        return ResponseEntity.status(401).body(BaseResponseBody.result(401, "잘못된 비밀번호 입니다"));
    }
    
    // 회원 정보 수정
    @PutMapping("/edit/{phone}")
    @ApiOperation(value = "회원 정보 수정", notes = "회원 정보를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원 수정 성공"),
            @ApiResponse(code = 401, message = "회원 수정 실패"),
            @ApiResponse(code = 404, message = "404 NOT FOUND")
    })
    public ResponseEntity<BaseResponseBody> updateUser(@PathVariable("phone") String phone, @RequestBody @ApiParam(value="회원 정보 수정 입력 정보", required = true) UserSignupReqDto userRequestDto) {
        // 현재 유저 정보를 가져온다
        User user = userService.getUserByPhone(phone);
        // 유저 정보를 수정하여 저장한다. 단, 만약에 이미 존재하는 핸드폰 번호이면 수정 불가능하다.
        boolean result = userService.modifyUserInfo(user, userRequestDto);
        if (!result) {
            return ResponseEntity.status(401).body(BaseResponseBody.result(401, "회원 정보를 수정할 수 없습니다."));
        }
        // 기존 유저 정보를 삭제한다.
        return ResponseEntity.status(200).body(BaseResponseBody.result(200, "회원 정보 수정 성공"));
    }


    @PostMapping("/reissue/access")
    @ApiOperation(value = "Access 토큰 재발급", notes = "Access 토큰이 만료되었을 경우 재발급한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "access 토큰 재발급 성공"),
            @ApiResponse(code = 401, message = "토큰이 유효하지 않음"),
            @ApiResponse(code = 404, message = "404 NOT FOUND")
    })
    public ResponseEntity<? extends BaseResponseBody> reissueAccess(HttpServletRequest request, HttpServletResponse response) {
        // 유효한 리프레시 토큰일 경우에만 엑세스 토큰을 재발급시켜준다.
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return ResponseEntity.status(404).body(BaseResponseBody.result(404, "쿠키에 리프레시 토큰이 없습니다."));
        }

        for (Cookie cookie : cookies) {
            if ((cookie.getName()).equals("refreshToken")) {
                refreshToken = cookie.getValue();
            }
        }

        AuthRefreshToken authRefreshToken = authRefreshTokenService.getRefreshToken(refreshToken);
        if (authRefreshToken != null) {
            JWTVerifier jwtVerifier = JwtTokenProvider.getVerifier(); // 토큰 검증을 실시
            DecodedJWT decodedJWT = jwtVerifier.verify(refreshToken.replace(JwtProperties.TOKEN_PREFIX, ""));
            String phone = decodedJWT.getSubject();
            String reissuedAccessToken = authRefreshTokenService.createAccessToken(phone); // access 토큰 재발급

            return ResponseEntity.status(200).body(UserLoginResDto.result(200, "엑세스 토큰 재발급 완료", reissuedAccessToken));
        }

        return ResponseEntity.status(401).body(BaseResponseBody.result(401, "토큰이 유효하지 않습니다."));
    }


    @PostMapping("/reissue/refresh")
    @ApiOperation(value = "Refresh 토큰 재발급", notes = "Refresh 토큰을 재발급해준다.")
    public ResponseEntity<BaseResponseBody> reissueRefresh(HttpServletRequest request, HttpServletResponse response) {
        // 리프레시 토큰을 재발급해준다. => 유효한 리프레시 토큰일 경우에만 발급
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return ResponseEntity.status(404).body(BaseResponseBody.result(404, "쿠키에 리프레시 토큰이 없습니다."));
        }

        for (Cookie cookie : cookies) {
            if ((cookie.getName()).equals("refreshToken")) {
                refreshToken = cookie.getValue();
            }
        }

        AuthRefreshToken authRefreshToken = authRefreshTokenService.getRefreshToken(refreshToken);

        if (authRefreshToken != null) {
            JWTVerifier jwtVerifier = JwtTokenProvider.getVerifier(); // 토큰 검증을 실시
            DecodedJWT decodedJWT = jwtVerifier.verify(refreshToken.replace(JwtProperties.TOKEN_PREFIX, ""));
            String phone = decodedJWT.getSubject();
            String reissuedRefreshToken = authRefreshTokenService.createRefreshToken(phone); // 리프레시 토큰 생성
            authRefreshTokenService.deleteRefreshToken(authRefreshToken); // 기존의 리프레시 토큰을 삭제

            Cookie cookie = new Cookie("refreshToken", reissuedRefreshToken); // 새로 발급한 리프레시 토큰을 넣음
            cookie.setMaxAge(60 * 60 * 24 * 30); // 쿠키의 유효 시간 설정 1초 단위 => 30일 30*24*60*60
            cookie.setPath("/"); // 쿠키를 허용할 범위 /: 사이트의 모든 곳
            cookie.setSecure(true); // 클라이언트가 https가 아닌 통신에서는 해당 쿠키를 전송하지 않도록 설정
            cookie.setHttpOnly(true); // 브라우저에서 쿠키에 접근할 수 없도록 설정
            response.addCookie(cookie); // 쿠기를 담아서 반환

            return ResponseEntity.status(200).body(BaseResponseBody.result(200, "리프레시 토큰 재발급 완료"));
        }
        
        return ResponseEntity.status(200).body(BaseResponseBody.result(200, "리프레시 토큰 발급 완료"));
    }


    @GetMapping("/test") // 권한 테스트용
    @ResponseBody
    public String test() {
        return "테스트 페이지";
    }

}

