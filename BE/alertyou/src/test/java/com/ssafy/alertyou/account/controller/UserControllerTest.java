package com.ssafy.alertyou.account.controller;

import com.ssafy.alertyou.account.dto.UserLoginReqDto;
import com.ssafy.alertyou.account.dto.UserSignupReqDto;
import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.account.service.UserService;
import com.ssafy.alertyou.common.BaseResponseBody;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
public class UserControllerTest {

    @Autowired
    private UserController userController;
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @AfterEach
    public void clean() {
        userRepository.deleteAll();
    }


    @Test
    @DisplayName("로그인 성공 테스트")
    public void loginSuccessTest() {
        // given
        UserSignupReqDto userSignupReqDto = new UserSignupReqDto("01092458873", "asd123", "박시원", 1L);
        userService.createUser(userSignupReqDto);
        UserLoginReqDto request = new UserLoginReqDto("01092458873", "asd123");

        // when & then
        ResponseEntity<? extends BaseResponseBody> response = userController.login(request, null);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }


    @Test
    @DisplayName("로그인 실패 테스트")
    public void loginFailTest() {
        // given
        UserSignupReqDto userSignupReqDto = new UserSignupReqDto("01092458873", "asd123", "박시원", 1L);
        userService.createUser(userSignupReqDto);
        UserLoginReqDto request = new UserLoginReqDto("01092458873", "asd321");

        // when & then
        ResponseEntity<? extends BaseResponseBody> response = userController.login(request, null);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

}
