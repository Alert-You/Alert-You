package com.ssafy.alertyou.report.service;

import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.account.service.AuthRefreshTokenService;
import com.ssafy.alertyou.alert.repository.AlertRepository;
import com.ssafy.alertyou.alert.service.AlertService;
import com.ssafy.alertyou.bodyguard.repository.CoGuardRepository;
import com.ssafy.alertyou.bodyguard.repository.OpGuardRepository;
import com.ssafy.alertyou.bodyguard.service.BodyGuardService;
import com.ssafy.alertyou.report.dto.ReportVictimReqDto;
import com.ssafy.alertyou.report.dto.ReportWitnessReqDto;
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

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ReportServiceTest {

    @Autowired
    private ReportRepository reportRepository;
    @Autowired
    private AlertRepository alertRepository;
    @Autowired
    private OpGuardRepository opGuardRepository;
    @Autowired
    private CoGuardRepository coGuardRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SchoolRepository schoolRepository;
    @Autowired
    private ReportService reportService;
    @Autowired
    private AuthRefreshTokenService authRefreshTokenService;

    @AfterEach
    public void clean(){
        alertRepository.deleteAll();
        reportRepository.deleteAll();
        opGuardRepository.deleteAll();
        coGuardRepository.deleteAll();
        userRepository.deleteAll();
        schoolRepository.deleteAll();
    }

    @Test
    @DisplayName("특정 사용자의 신고 리스트 조회 테스트")
    public void getReportListTest() throws Exception{
        // given
        School school = schoolRepository.save(toSchool(1,"92"));
        User user = userRepository.save(toUser("01043562322", "김뭉치", "0000", "student", school));
        // when
        ResponseEntity<Map<String, Object>> res = reportService.getReportList(user.getId());
        // then
        assertThat(res.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    @DisplayName("신고 내역 조회 테스트")
    public void getReportDetailTest() throws Exception{
        // given
        School school = schoolRepository.save(toSchool(1,"64"));
        User user = userRepository.save(toUser("01043564433", "송가락", "0000", "student", school));
        Report report = reportRepository.save(toReport(user, true, 36.339929, 127.388519));

        // when
        ResponseEntity<Map<String, Object>> res = reportService.getReportDetail(report.getId());
        // then
        assertThat(res.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    @DisplayName("신고자 신고 테스트")
    public void getAddReportVictimTest() throws Exception{
        // given
        School school = schoolRepository.save(toSchool(1,"34"));
        User user = userRepository.save(toUser("01041564433", "박박박", "0000", "student", school));
        String token = authRefreshTokenService.createAccessToken(user.getPhone());
        ReportVictimReqDto reportVictimReqDto = new ReportVictimReqDto(36.339929, 127.388519);

        // when
        ResponseEntity<Map<String, Object>> res = reportService.addReportVictim(token, reportVictimReqDto);
        // then
        assertThat(res.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    @DisplayName("목격자 신고 테스트")
    public void getAddReportWitnessTest() throws Exception{
        // given
        School school = schoolRepository.save(toSchool(1,"74"));
        User user = userRepository.save(toUser("01099564413", "김문빈", "0000", "student", school));
        String token = authRefreshTokenService.createAccessToken(user.getPhone());
        ReportWitnessReqDto reportWitnessReqDto = new ReportWitnessReqDto(36.339929, 127.388519, "", "");

        // when
        ResponseEntity<Map<String, Object>> res = reportService.addReportWitness(token, reportWitnessReqDto);
        // then
        assertThat(res.getStatusCode()).isEqualTo(HttpStatus.OK);
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
}
