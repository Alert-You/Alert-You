package com.ssafy.alertyou.school.service;
import com.ssafy.alertyou.account.dto.UserSignupReqDto;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.service.AuthRefreshTokenService;
import com.ssafy.alertyou.account.service.UserService;
import com.ssafy.alertyou.proof.entity.Proof;
import com.ssafy.alertyou.school.entity.School;
import com.ssafy.alertyou.school.repository.SchoolRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.*; // junit4??
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@SpringBootTest
public class SchoolServiceTest {
    @Autowired
    private SchoolRepository schoolRepository;

    @Autowired
    private SchoolService schoolService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthRefreshTokenService authRefreshTokenService;


//    @AfterEach
//    public void deleteClass(){
//        schoolRepository.deleteAll();
//    }

    @Test
    @DisplayName("학교 검색 테스트")
    public void getSchoolList() throws Exception {
        schoolRepository.save(toEntity(1,"1"));
        schoolRepository.save(toEntity(2,"1"));
        schoolRepository.save(toEntity(3,"1"));

        ResponseEntity<Map<String, Object>> res =  schoolService.getSchools("싸피");
        assertThat(res.getStatusCode().equals(200));
    }

    @Test
    @DisplayName("학교 반 정보 리스트 : 학교&주소")
    public void getClassesByNameAndAddress() throws Exception{
        schoolRepository.save(toEntity(1,"2"));
        schoolRepository.save(toEntity(2,"2"));
        schoolRepository.save(toEntity(3,"2"));

        ResponseEntity<Map<String, Object>> res =  schoolService.getGradesAndClasses(null,"싸피고등학교","덕명동");
        assertThat(res.getBody().size() == 4);
    }

    @Test
    @DisplayName("학교 반 정보 리스트 : 토큰")
    public void getClassesByToken() throws Exception{
        UserSignupReqDto userSignupReqDto = new UserSignupReqDto("01029128780", "asd123", "김애리", 1L);
        userService.createUser(userSignupReqDto);
        User user = userService.getUserByPhone(userSignupReqDto.getPhone());
        String token = authRefreshTokenService.createAccessToken(user.getPhone());

        schoolRepository.save(toEntity(1,"3"));
        schoolRepository.save(toEntity(2,"3"));
        schoolRepository.save(toEntity(3,"3"));

        ResponseEntity<Map<String, Object>> res =  schoolService.getGradesAndClasses(token, null, null);
        assertThat(res.getBody().size() == 4);
    }

    @Test
    @DisplayName("학교 번호 반환")
    public void getSchoolId() throws Exception{
        Long id = schoolRepository.save(toEntity(1,"4")).getId();


        Long res =  (Long)schoolService.getSchoolsNumber("싸피고등학교","덕명동", 1, "4").getBody().get("schoolId");
        assertThat(res.equals(id));
    }

    public School toEntity(int grade, String classRoom){
        return School.builder()
                .address("덕명동")
                .classRoom(classRoom)
                .grade(grade)
                .name("싸피고등학교")
                .region("대전")
                .users(new ArrayList<>())
                .build();
    }

}
