//package com.ssafy.alertyou.bodyguard.service;
//
//import com.ssafy.alertyou.account.dto.UserSignupReqDto;
//import com.ssafy.alertyou.account.entity.User;
//import com.ssafy.alertyou.account.repository.UserRepository;
//import com.ssafy.alertyou.account.service.AuthRefreshTokenService;
//import com.ssafy.alertyou.bodyguard.repository.CoGuardRepository;
//import com.ssafy.alertyou.bodyguard.repository.OpGuardRepository;
//import com.ssafy.alertyou.school.entity.School;
//import com.ssafy.alertyou.school.repository.SchoolRepository;
//import org.junit.Test;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import java.util.ArrayList;
//import java.util.Map;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest
//public class BodyGuardServiceTest {
//
//    @Autowired
//    private OpGuardRepository opGuardRepository;
//    @Autowired
//    private CoGuardRepository coGuardRepository;
//    @Autowired
//    private UserRepository userRepository;
//    @Autowired
//    private SchoolRepository schoolRepository;
//    @Autowired
//    private BodyGuardService bodyGuardService;
//    @Autowired
//    private AuthRefreshTokenService authRefreshTokenService;
//
//    @AfterEach
//    public void clean(){
//        opGuardRepository.deleteAll();
//        coGuardRepository.deleteAll();
//        userRepository.deleteAll();
//        schoolRepository.deleteAll();
//    }
//
//    @Test
//    @DisplayName("보디가드 조회 테스트")
//    public void getBodyGuardTest() throws Exception{
//        // given
//        School school = toSchool(1, "5");
//        schoolRepository.save(school);
////        School school = schoolRepository.save(toSchool(1,"10"));
//        // when
//        // then
//    }
//
//    @Test
//    @DisplayName("학생 보디가드 등록 및 해제 테스트")
//    public void addBodyGuardTest() throws Exception {
//
//        // given
//        School school = schoolRepository.save(toSchool(1,"10"));
//        // 등록하려는 가드
//        User guard = userRepository.save(toUser("01012345678", "김철수", "0000", "student", school));
//        // 등록하려는 사람
//        User user = userRepository.save(toUser("01087654321", "김영희", "0000", "student", school));
//
//        long guardId = guard.getId(); // 등록하려는 가드
//
//        String token = authRefreshTokenService.createAccessToken(user.getPhone());
//
//        // when
//        ResponseEntity<Map<String, Object>> res = bodyGuardService.addBodyGuard(token, guardId);
//
//        // then
//        assertThat(res.getStatusCode()).isEqualTo(HttpStatus.OK);
//    }
//
//    public User toUser(String phone, String name, String password, String role, School school){
//        return User.builder()
//                .phone(phone)
//                .username(name)
//                .password(password)
//                .school(school)
//                .role(role)
//                .active(true)
//                .build();
//    }
//
//    public School toSchool(int grade, String classRoom){
//        return School.builder()
//                .address("덕명동")
//                .classRoom(classRoom)
//                .grade(grade)
//                .name("싸피고등학교")
//                .region("대전")
//                .users(new ArrayList<>())
//                .build();
//    }
//}
