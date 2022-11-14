package com.ssafy.alertyou.alert.service;

import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.account.service.AuthRefreshTokenService;
import com.ssafy.alertyou.alert.entity.Alert;
import com.ssafy.alertyou.alert.repository.AlertRepository;
import com.ssafy.alertyou.bodyguard.repository.CoGuardRepository;
import com.ssafy.alertyou.bodyguard.repository.OpGuardRepository;
import com.ssafy.alertyou.bodyguard.service.BodyGuardService;
import com.ssafy.alertyou.report.entity.Report;
import com.ssafy.alertyou.report.repository.ReportRepository;
import com.ssafy.alertyou.school.entity.School;
import com.ssafy.alertyou.school.repository.SchoolRepository;
import org.junit.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AlertServiceTest {

    @Autowired
    private AlertService alertService;
    @Autowired
    private AlertRepository alertRepository;
    @Autowired
    private CoGuardRepository coGuardRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SchoolRepository schoolRepository;
    @Autowired
    private BodyGuardService bodyGuardService;
    @Autowired
    private ReportRepository reportRepository;
    @Autowired
    private AuthRefreshTokenService authRefreshTokenService;

    @AfterEach
    public void clean(){
        alertRepository.deleteAll();
        coGuardRepository.deleteAll();
        userRepository.deleteAll();
        schoolRepository.deleteAll();
    }

    @Test
    @DisplayName("알람 리스트 조회 테스트")
    public void getAlertListTest() throws Exception{
        // given
        School school = schoolRepository.save(toSchool(1,"342"));
        User user = userRepository.save(toUser("01003610000", "박정원", "0000", "student", school));
        String token = authRefreshTokenService.createAccessToken(user.getPhone());
        // when
        ResponseEntity<Map<String, Object>> res = alertService.getAlertList(token);
        // then
        assertThat(res.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    @DisplayName("알람 확인(수정) 테스트")
    public void modifyAlertTest() throws Exception{
        // given
        School school = schoolRepository.save(toSchool(2,"32"));
        User user = userRepository.save(toUser("01878114423", "빈빠박", "0000", "student", school));
        Report report = reportRepository.save(toReport(user, true, 36.339929, 127.388519));

        Alert alert = alertRepository.save(toAlert(user, report));
        long alertId = alert.getId();

        // when
        alertService.modifyAlert(alertId);
        Optional<Alert> alertcheck = alertRepository.findById(alertId);
        Boolean checkTest = alertcheck.get().getChecked();

        // then
        assertThat(checkTest).isEqualTo(true);
    }

    public User toUser(String phone, String name, String password, String role, School school){
        return User.builder()
                .phone(phone)
                .username(name)
                .password(password)
                .school(school)
                .role(role)
                .active(true)
                .build();
    }

    public School toSchool(int grade, String classRoom){
        return School.builder()
                .address("둔산동")
                .classRoom(classRoom)
                .grade(grade)
                .name("싸피고등학교")
                .region("대전")
                .users(new ArrayList<>())
                .build();
    }

    public Report toReport(User user, Boolean victim, double latitude, double longtitude){
        return Report.builder()
                .reUser(user)
                .alerts(new ArrayList<>())
                .isVictim(victim)
                .noticeDateTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")).toString())
                .latitude(latitude)
                .longitude(longtitude)
                .build();


    }

    public Alert toAlert(User guard, Report report){
        return Alert.builder()
                .user(guard)
                .report(report)
                .checked(false)
                .build();
    }
}
