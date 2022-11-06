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

}
