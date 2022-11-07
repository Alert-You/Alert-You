package com.ssafy.alertyou.account.service;

import com.ssafy.alertyou.account.dto.UserSignupReqDto;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.bodyguard.repository.CoGuardRepository;
import com.ssafy.alertyou.school.repository.SchoolRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import static org.junit.jupiter.api.Assertions.*; // junit5
import static org.assertj.core.api.Assertions.*; // junit4??

@SpringBootTest
public class UserServiceTest {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private CoGuardRepository coGuardRepository;
    @Autowired
    private SchoolRepository schoolRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @AfterEach
    public void clean() {
        userRepository.deleteAll();
    }

    @Test
    @DisplayName("유저 생성 테스트")
    public void createUserTest() {
        // given
        UserSignupReqDto userSignupReqDto = new UserSignupReqDto("01092458873", "asd123", "박시원", 1L);

        // when
        userService.createUser(userSignupReqDto);

        // then
        User user = userService.getUserByPhone(userSignupReqDto.getPhone());
        assertThat(user.getUsername()).isEqualTo("박시원");
//        assertEquals(user.getUsername(), "박시원");
    }

    @Test
    @DisplayName("유저 수정 테스트")
    public void modifyUserTest() {
        // given
        UserSignupReqDto userSignupReqDto = new UserSignupReqDto("01092458873", "asd123", "박시원", 1L);
        userService.createUser(userSignupReqDto);

        // when
        UserSignupReqDto userModifyReqDto = new UserSignupReqDto("01092458873", "asd123", "시원박", 3L);
        userService.modifyUserInfo(userRepository.findByPhone(userSignupReqDto.getPhone()), userModifyReqDto);

        // then
        User user = userRepository.findByPhone(userModifyReqDto.getPhone());
        assertThat(user.getUsername()).isEqualTo("시원박");
    }
    
    @Test
    @DisplayName("유저 수정 실패 테스트")
    public void modifyUserFailTest() {
        // given
        UserSignupReqDto userSignupReqDto = new UserSignupReqDto("01092458873", "asd123", "박시원", 1L);
        userService.createUser(userSignupReqDto);

        UserSignupReqDto userSignupReqDto2 = new UserSignupReqDto("01092458874", "asd123", "원시박", 1L);
        userService.createUser(userSignupReqDto2);

        // when
        UserSignupReqDto userModifyReqDto = new UserSignupReqDto("01092458874", "asd123", "시원박", 1L);
        userService.modifyUserInfo(userRepository.findByPhone(userSignupReqDto.getPhone()), userModifyReqDto);

        // then
        User user = userRepository.findByPhone(userModifyReqDto.getPhone());
        assertThat(user.getUsername()).isEqualTo("원시박"); // 유저 수정이 되지 않았으니 원래 주인인 원시박이어야함
    }
    

    @Test
    @DisplayName("유저 탈퇴 테스트")
    public void deleteUserTest() {
        // given
        UserSignupReqDto userSignupReqDto = new UserSignupReqDto("01092458873", "asd123", "박시원", 1L);
        userService.createUser(userSignupReqDto);

        // when
        User user = userRepository.findByPhone(userSignupReqDto.getPhone());
        userService.removeUser(user);

        // then
        assertThat(user.isActive()).isFalse();
    }

}
