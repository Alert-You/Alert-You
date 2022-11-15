package com.ssafy.alertyou.report.service;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.google.firebase.messaging.BatchResponse;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.MulticastMessage;
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
import com.ssafy.alertyou.report.dto.*;
import com.ssafy.alertyou.report.repository.ReportRepository;
import com.ssafy.alertyou.report.entity.Report;
import com.ssafy.alertyou.school.entity.School;
import com.ssafy.alertyou.util.Util;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static com.ssafy.alertyou.util.Util.decodeToken;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;
    private final OpGuardRepository opGuardRepository;
    private final CoGuardRepository coGuardRepository;
    private final AlertRepository alertRepository;
    private final Util util;
    private final String SUCCESS = "SUCCESS";
    private final String FAIL = "FAIL";

    public List<ReportListResDto> getReportList(long id) throws Exception{
        List<ReportListResDto> list = new ArrayList<>();

        try{
            User user = util.findUser(id);

            List<Report> reportlist = reportRepository.findAllByReUser(user);

            for(Report report : reportlist){
                list.add(new ReportListResDto(report));
            }

            return list;

        } catch (Exception e){
            return null;
        }
    }

    public ReportResDto getReportDetail(long id) throws Exception{
        Report report = findReport(id);
        try{
            return new ReportResDto(report);

        } catch (Exception e){
            return null;
        }

    }
    
    // 당사자 신고
    public Long addReportVictim(String token, ReportVictimReqDto reportVictimReqDto) throws Exception{

        User user = util.findUser(util.findUserByPhone(decodeToken(token)).getId());

        double latitude = reportVictimReqDto.getLatitude();
        double longitude = reportVictimReqDto.getLongitude();
        String nowTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")).toString();
        String[] location = LocationService.reverseGeo(longitude, latitude);
        String address = (location != null) ? location[1] : null;
        try{
            Report newReport = Report.builder()
                    .reUser(user)
                    .isVictim(true)
                    .noticeDateTime(nowTime)
                    .latitude(latitude)
                    .longitude(longitude)
                    .location(address)
                    .build();

            // 알람 등록: 내가 등록한 가드
            long alertReportId = reportRepository.save(newReport).getId(); // 등록할 신고 ID

            addAlert(alertReportId, user);

            Report report = findReport(alertReportId);

            List<Alert> alertList = findAlertUser(report); // 신고로 id를 찾는다
            for (Alert alert : alertList) {
                User guardUser = alert.getUser(); // 해당 신고의 알람을 받을 가드
                String fcmToken = findUser(guardUser.getId()).getFcmToken();
                FCMService.sendFCMMessage(fcmToken); // fcm메세지를 보냄
            }

            return user.getId();

        } catch (Exception e) {
            return null;
        }
    }

    public Long addReportWitness(String token, ReportWitnessReqDto reportWitnessReqDto) throws Exception{

        User user = util.findUser(util.findUserByPhone(decodeToken(token)).getId());

        double latitude = reportWitnessReqDto.getLatitude();
        double longitude = reportWitnessReqDto.getLongitude();
        String nowTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")).toString();
        String content = reportWitnessReqDto.getContent();
        String place  = reportWitnessReqDto.getPlace();
        String[] location = LocationService.reverseGeo(longitude, latitude);
        String address = (location != null) ? location[1] : null;
        try{
            Report newReport = Report.builder()
                    .reUser(user)
                    .isVictim(false)
                    .noticeDateTime(nowTime)
                    .latitude(latitude)
                    .longitude(longitude)
                    .content(content)
                    .place(place)
                    .location(address)
                    .build();

            long alertReportId = reportRepository.save(newReport).getId();

            addAlert(alertReportId, user);

            Report report = findReport(alertReportId);

            List<Alert> alertList = findAlertUser(report); // 신고로 id를 찾는다
            for (Alert alert : alertList) {
                User guardUser = alert.getUser(); // 해당 신고의 알람을 받을 가드
                String fcmToken = util.findUser(guardUser.getId()).getFcmToken();
                FCMService.sendFCMMessage(fcmToken); // fcm메세지를 보냄
            }

            return user.getId();

        }catch (Exception e){
            return null;
        }
    }

    public Long addFCMToken(String token, FCMReqDto fcmResDto) throws Exception {

        try{
            User user = util.findUserByPhone(decodeToken(token)); // 사용자를 가지고 사용자 id를 찾기
            String fcmtoken = fcmResDto.getFcmToken();
            user.updateFCM(fcmtoken);
            userRepository.save(user);

            return user.getId();

        } catch (Exception e) {
            return null;
        }
    }

    public Report findReport(long id){
        return reportRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Report Not Found"));
    }

    public List<Alert> findAlertUser(Report report){
        return alertRepository.findAllByReport(report);
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

        User userTeacher = userRepository.findBySchoolAndRole(userSchool, "교사"); // 선생님 ID 찾기

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