package com.ssafy.alertyou.account.controller;

import com.ssafy.alertyou.account.dto.*;
import com.ssafy.alertyou.account.entity.AuthRefreshToken;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.service.AuthRefreshTokenService;
import com.ssafy.alertyou.account.service.UserService;
import com.ssafy.alertyou.common.BaseResponseBody;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Api(value = "회원 관리 API", tags = {"auth"})
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final AuthRefreshTokenService authRefreshTokenService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

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

        if (user == null || !user.isActive()) { // 로그인 요청한 유저가 DB에 존재하지 않거나 active가 아니면 404 리턴
            return ResponseEntity.status(404).body(UserLoginResDto.result(404, "해당 유저가 없습니다.", null, null));
        }

        if (bCryptPasswordEncoder.matches(password, user.getPassword())) { // 로그인 요청 시 입력한 패스워드가 DB의 패스워드와 일치한다면 로그인 성공
            String refreshToken = authRefreshTokenService.createRefreshToken(phone); // 리프레시 토큰 생성
            // response.addCookie(cookie); // 쿠기를 담아서 반환

            // 엑세스 토큰, 리프레시 토큰과 함께 로그인 결과 반환
            String accessToken = authRefreshTokenService.createAccessToken(phone);
            return ResponseEntity.ok().body(UserLoginResDto.result(200, "로그인 성공", accessToken, refreshToken));
        }

        return ResponseEntity.status(401).body(UserLoginResDto.result(401, "잘못된 비밀번호", null, null));
    }


    @PostMapping("/logout")
    @ApiOperation(value = "로그 아웃", notes = "로그 아웃을 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그 아웃 성공"),
            @ApiResponse(code = 401, message = "인가된 사용자 아님"),
            @ApiResponse(code = 404, message = "404 NOT FOUND")
    })
    public ResponseEntity<BaseResponseBody> logout(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = request.getHeader("refreshToken");

//        String refreshToken = authRefreshTokenService.getRefreshTokenFromCookie(request);
        if (refreshToken == null) {
            return ResponseEntity.status(404).body(BaseResponseBody.result(404, "리프레시 토큰이 없습니다."));
        }

        AuthRefreshToken authRefreshToken = authRefreshTokenService.getRefreshToken(refreshToken);

        if (authRefreshToken != null) { // DB에 리프레시 토큰이 있으면 삭제, 쿠키를 초기화하고 로그아웃
            authRefreshTokenService.deleteRefreshToken(authRefreshToken);
//            Cookie cookie = new Cookie("refreshToken", null); // 리프레시 토큰 초기화
//            cookie.setMaxAge(0); // 쿠키 유효 기간 초기화
//            cookie.setPath("/");
//            response.addCookie(cookie);
            return ResponseEntity.status(200).body(BaseResponseBody.result(200, "로그 아웃 성공"));
        }

        return ResponseEntity.status(401).body(BaseResponseBody.result(401, "토큰이 유효하지 않습니다."));
    }


    @PostMapping("/signup")
    @ApiOperation(value = "회원 가입", notes = "휴대전화 번호, 이름, 비밀번호를 입력하여 회원 가입을 한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "회원 가입 성공", response = UserSignupResDto.class),
            @ApiResponse(code = 400, message = "회원 가입 실패"),
            @ApiResponse(code = 404, message = "404 NOT FOUND")
    })
    public ResponseEntity<UserSignupResDto> signup(@RequestBody @ApiParam(value="회원가입 입력 정보", required = true) UserSignupReqDto userRequestDto) {
        try {
            if (userService.createUser(userRequestDto)) {
                return ResponseEntity.status(201).body(UserSignupResDto.result(201, "회원 가입 성공", true));
            } else {
                return ResponseEntity.status(400).body(UserSignupResDto.result(400, "회원 가입 실패", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(404).body(UserSignupResDto.result(404, "페이지를 찾을 수 없습니다.", false));
        }
    }


    @DeleteMapping("/signout")
    @ApiOperation(value = "회원 탈퇴", notes = "휴대전화 번호, 이름, 비밀번호를 입력, 확인한 뒤 탈퇴한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "회원 탈퇴 성공"),
            @ApiResponse(code = 400, message = "회원 탈퇴 실패"),
            @ApiResponse(code = 404, message = "404 NOT FOUND")
    })
    public ResponseEntity<BaseResponseBody> signout(@RequestBody @ApiParam(value="로그인 입력 정보", required = true) UserLoginReqDto userLoginReqDto) {
        User user = userService.getUserByPhone(userLoginReqDto.getPhone());
        if (user == null) { // 사용자가 없으면
            return ResponseEntity.status(404).body(BaseResponseBody.result(404, "해당 유저는 존재하지 않습니다."));
        }

        if (bCryptPasswordEncoder.matches(userLoginReqDto.getPassword(), user.getPassword())) { // 비밀번호가 일치하면 탈퇴 처리
            userService.removeUser(user);
            return ResponseEntity.status(200).body(BaseResponseBody.result(200, "회원 탈퇴 처리 성공"));
        }

        return ResponseEntity.status(401).body(BaseResponseBody.result(401, "잘못된 비밀번호 입니다"));
    }
    

    @PutMapping("/update")
    @ApiOperation(value = "회원 정보 수정", notes = "회원 정보를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원 수정 성공"),
            @ApiResponse(code = 401, message = "회원 수정 실패"),
            @ApiResponse(code = 404, message = "404 NOT FOUND")
    })
    public ResponseEntity<BaseResponseBody> updateUser(@RequestBody @ApiParam(value="회원 정보 수정 입력 정보", required = true) UserSignupReqDto userRequestDto, HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        if (accessToken == null) {
            return ResponseEntity.status(404).body(BaseResponseBody.result(404, "Access 토큰이 없습니다."));
        }
        String phone = authRefreshTokenService.getPhoneFromToken(accessToken);
        User user = userService.getUserByPhone(phone); // 현재 유저 정보를 가져온다
        boolean result = userService.modifyUserInfo(user, userRequestDto); // 유저 정보를 수정하여 저장한다. 단, 만약에 이미 존재하는 핸드폰 번호이면 수정 불가능하다
        if (!result) {
            return ResponseEntity.status(401).body(BaseResponseBody.result(401, "회원 정보를 수정할 수 없습니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.result(200, "회원 정보 수정 성공")); // 기존 유저 정보를 삭제한다
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
        String refreshToken = request.getHeader("refreshToken");
        if (refreshToken == null || !authRefreshTokenService.getTokenExpiration(refreshToken)) {
            return ResponseEntity.status(404).body(BaseResponseBody.result(404, "리프레시 토큰이 없습니다."));
        }

        AuthRefreshToken authRefreshToken = authRefreshTokenService.getRefreshToken(refreshToken);
        if (authRefreshToken != null) {
            String phone = authRefreshTokenService.getPhoneFromToken(refreshToken);
            String reissuedAccessToken = authRefreshTokenService.createAccessToken(phone); // access 토큰 재발급

            return ResponseEntity.status(200).body(UserLoginResDto.result(200, "엑세스 토큰 재발급 완료", reissuedAccessToken, null));
        }

        return ResponseEntity.status(401).body(BaseResponseBody.result(401, "토큰이 유효하지 않거나 이미 로그아웃했습니다."));
    }


    @PostMapping("/reissue/refresh")
    @ApiOperation(value = "refresh 토큰과 access 토큰 재발급", notes = "refresh 토큰과 access 토큰 재발급을 재발급해준다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "refresh, access 토큰 재발급 성공"),
            @ApiResponse(code = 401, message = "권한이 없습니다"),
            @ApiResponse(code = 404, message = "토큰이 없거나 유효하지 않습니다")
    })
    public ResponseEntity<? extends BaseResponseBody> reissueRefresh(HttpServletRequest request, HttpServletResponse response) {
        // 리프레시 토큰을 재발급해준다. => 유효한 리프레시 토큰일 경우에만 발급
        String refreshToken = request.getHeader("refreshToken");
        if (refreshToken == null || !authRefreshTokenService.getTokenExpiration(refreshToken)) {
            return ResponseEntity.status(404).body(BaseResponseBody.result(404, "리프레시 토큰이 없거나 만료되었습니다."));
        }

        AuthRefreshToken authRefreshToken = authRefreshTokenService.getRefreshToken(refreshToken);

        if (authRefreshToken != null) {
            String phone = authRefreshTokenService.getPhoneFromToken(refreshToken);
            String reissuedRefreshToken = authRefreshTokenService.createRefreshToken(phone); // 리프레시 토큰을 발급
            String reissuedAccessToken = authRefreshTokenService.createAccessToken(phone); // 엑세스 토큰을 발급
            authRefreshTokenService.deleteRefreshToken(authRefreshToken); // 기존의 리프레시 토큰을 삭제
//            response.addCookie(cookie); // 쿠기를 담아서 반환

            return ResponseEntity.status(200).body(UserLoginResDto.result(200, "리프레시 토큰, 엑세스 토큰 재발급 완료", reissuedAccessToken, reissuedRefreshToken));
        }
        
        return ResponseEntity.status(401).body(BaseResponseBody.result(401, "권한이 없습니다."));
    }


    @GetMapping("/profile")
    @ApiOperation(value = "회원 상세 정보 조회", notes = "휴대 전화 번호를 입력하여 회원 상세 정보를 확인한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원 상세 정보 조회 성공"),
            @ApiResponse(code = 401, message = "권한 없음"),
            @ApiResponse(code = 404, message = "회원을 찾을 수 없음")
    })
    public ResponseEntity<? extends BaseResponseBody> getUser(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        if (accessToken == null) {
            return ResponseEntity.status(404).body(BaseResponseBody.result(404, "Access 토큰이 없습니다."));
        }
        String phone = authRefreshTokenService.getPhoneFromToken(accessToken);
        User user = userService.getUserByPhone(phone);
        if (user == null || !user.isActive()) { // 유저가 존재하지 않거나 탈퇴 유저이면
            return ResponseEntity.status(404).body(BaseResponseBody.result(404, "존재하지 않는 유저입니다."));
        }
        UserInfoResDto userInfoResDto = userService.getUserInfo(phone);
        return ResponseEntity.status(200).body(userInfoResDto);
    }

    @DeleteMapping("/delete/{phone}") // 나중에 삭제
    @ApiOperation(value = "회원 완전 삭제 api", notes = "회원가입 테스트 목적 회원 완전 삭제 api")
    public ResponseEntity<BaseResponseBody> deleteUser(@PathVariable("phone") String phone) {
        boolean ret = userService.removeUser(phone);
        if (ret) {
            return ResponseEntity.status(200).body(BaseResponseBody.result(200, "삭제 성공"));
        }
        return ResponseEntity.status(404).body(BaseResponseBody.result(404, "해당 유저가 없습니다."));
    }

}
