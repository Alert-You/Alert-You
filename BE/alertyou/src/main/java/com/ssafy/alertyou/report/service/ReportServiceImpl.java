package com.ssafy.alertyou.report.service;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.jwt.JwtProperties;
import com.ssafy.alertyou.account.jwt.JwtTokenProvider;
import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.alert.entity.Alert;
import com.ssafy.alertyou.alert.repository.AlertRepository;
import com.ssafy.alertyou.bodyguard.entity.Coguard;
import com.ssafy.alertyou.bodyguard.entity.Opguard;
import com.ssafy.alertyou.bodyguard.repository.CoGuardRepository;
import com.ssafy.alertyou.bodyguard.repository.OpGuardRepository;
import com.ssafy.alertyou.report.dto.ReportListResDto;
import com.ssafy.alertyou.report.repository.ReportRepository;
import com.ssafy.alertyou.report.dto.ReportResDto;
import com.ssafy.alertyou.report.dto.ReportVictimReqDto;
import com.ssafy.alertyou.report.dto.ReportWitnessReqDto;
import com.ssafy.alertyou.report.entity.Report;
import com.ssafy.alertyou.school.entity.School;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;
    private final OpGuardRepository opGuardRepository;
    private final CoGuardRepository coGuardRepository;
    private final AlertRepository alertRepository;
    private final String SUCCESS = "SUCCESS";
    private final String FAIL = "FAIL";

    public ResponseEntity<Map<String, Object>> getReportList(long id) throws Exception{

        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();
        List<ReportListResDto> list = new ArrayList<>();

        try{
            User user = findUser(id);

            List<Report> reportlist = reportRepository.findAllByReUser(user);

            for(Report report : reportlist){
                list.add(new ReportListResDto(report));
            }

            result.put("msg",SUCCESS);
            result.put("reports", list);
            status = HttpStatus.OK;

        } catch (Exception e){
            result.put("msg",FAIL);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(result, status);
    }

    public ResponseEntity<Map<String, Object>> getReportDetail(long id) throws Exception{
        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();

        Report report = findReport(id);

        try{
            result.put("msg",SUCCESS);
            result.put("report", new ReportResDto(report));
            status = HttpStatus.OK;
        } catch (Exception e){
            result.put("msg",FAIL);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(result, status);

    }

    public ResponseEntity<Map<String, Object>> addReportVictim(String token, ReportVictimReqDto reportVictimReqDto) throws Exception{

        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();

        User user = findUser(findUserByPhone(decodeToken(token)).getId());

        double latitude = reportVictimReqDto.getLatitude();
        double longitude = reportVictimReqDto.getLongitude();
        String nowTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")).toString();
        String[] location = LocationService.reverseGeo(longitude, latitude);

        try{
            Report newReport = Report.builder()
                    .reUser(user)
                    .isVictim(true)
                    .noticeDateTime(nowTime)
                    .latitude(latitude)
                    .longitude(longitude)
                    .location(location[1])
                    .build();

            // 알람 등록: 내가 등록한 가드
            long alertReportId = reportRepository.save(newReport).getId(); // 등록할 신고 ID

            addAlert(alertReportId, user);

            result.put("msg",SUCCESS);
            status = HttpStatus.OK;

        }catch (Exception e){
            result.put("msg", FAIL);
            status = HttpStatus.BAD_REQUEST;

        }

        return new ResponseEntity<>(result, status);
    }

    public ResponseEntity<Map<String, Object>> addReportWitness(String token, ReportWitnessReqDto reportWitnessReqDto) throws Exception{
        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();

        User user = findUser(findUserByPhone(decodeToken(token)).getId());

        double latitude = reportWitnessReqDto.getLatitude();
        double longitude = reportWitnessReqDto.getLongitude();
        String nowTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")).toString();
        String content = reportWitnessReqDto.getContent();
        String place  = reportWitnessReqDto.getPlace();
        String[] location = LocationService.reverseGeo(longitude, latitude);

        try{
            Report newReport = Report.builder()
                    .reUser(user)
                    .isVictim(false)
                    .noticeDateTime(nowTime)
                    .latitude(latitude)
                    .longitude(longitude)
                    .content(content)
                    .place(place)
                    .location(location[1])
                    .build();

            long alertReportId = reportRepository.save(newReport).getId();

            addAlert(alertReportId, user);

            result.put("msg",SUCCESS);
            status = HttpStatus.OK;

        }catch (Exception e){
            result.put("msg", FAIL);
            status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<>(result, status);
    }

    public User findUser(long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User Not Found"));
    }

    public Report findReport(long id){
        return reportRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Report Not Found"));
    }

    public List<Opguard> findGuard(User user){
        return opGuardRepository.findAllByOpGuard(user);
    }

    public User findUserByPhone(String phone){
        return userRepository.findByPhone(phone);
    }

    public String decodeToken(String token) throws Exception{
        JWTVerifier jwtVerifier = JwtTokenProvider.getVerifier(); // 토큰 검증을 실시
        DecodedJWT decodedJWT = jwtVerifier.verify(token.replace(JwtProperties.TOKEN_PREFIX, "")); // 토큰에서 Bearer 를 제거함
        return decodedJWT.getSubject(); // 디코딩한 JWT 토큰에서 핸드폰 번호를 가져옴
    }


    public void addAlert(long alertReportId, User user){

        Report guardReport = findReport(alertReportId);

        // 특정 사용자의 가드 리스트 확인
        List<Opguard> OpUserList = opGuardRepository.findAllByUser(user);

        // 기존 알람 목록에 해당 신고-가드가 없을 때만 추가
        for(Opguard opguard : OpUserList){
            if(!alertRepository.findByUserAndReport(opguard.getOpGuard(), guardReport).isPresent()){
                Alert newAlert = Alert.builder()
                        .user(opguard.getOpGuard())
                        .report(guardReport)
                        .checked(false)
                        .build();
                alertRepository.save(newAlert);
            }
        }

        // 알람 등록: 선생님이 등록한 가드
        School userSchool = user.getSchool(); // 신고 내역에 있는 유저의 학교 ID

        User userTeacher = userRepository.findBySchoolAndRole(userSchool, "teacher"); // 선생님 ID 찾기

        List<Coguard> CoUserList = coGuardRepository.findAllByUser(userTeacher);

        // 기존 알람 목록에 해당 신고-가드가 없을 때만 추가
        for(Coguard coguard : CoUserList){
            if(!alertRepository.findByUserAndReport(coguard.getCoGuard(), guardReport).isPresent()){
                Alert newAlert = Alert.builder()
                        .user(coguard.getCoGuard())
                        .report(guardReport)
                        .checked(false)
                        .build();
                alertRepository.save(newAlert);
            }
        }
    }




}
