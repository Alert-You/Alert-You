package com.ssafy.alertyou.report.service;

import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.account.service.VerificationService;
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

    private final VerificationService verificationService;
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
    
    // ????????? ??????
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

            // ?????? ??????: ?????? ????????? ??????
            long alertReportId = reportRepository.save(newReport).getId(); // ????????? ?????? ID

            addAlert(alertReportId, user);

            Report report = findReport(alertReportId);
            address = (address != null) ? address.replace("?????????", "") : null;
            List<Alert> alertList = findAlertUser(report); // ????????? id??? ?????????
            String content = "[?????????] ?????? ?????? ??????\n??????: " + address;
            String body = "[??????] ?????? ?????? ????????? ?????? ??????";
            for (Alert alert : alertList) {
                User guardUser = alert.getUser(); // ?????? ????????? ????????? ?????? ??????
                String fcmToken = guardUser.getFcmToken();
                FCMService.sendFCMMessage(fcmToken, body); // fcm???????????? ??????
                verificationService.sendSMS(guardUser.getPhone(), content);
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
            address = (address != null) ? address.replace("?????????", "") : null;
            List<Alert> alertList = findAlertUser(report); // ????????? id??? ?????????
            String body = "[??????] ?????? ?????? ????????? ?????? ??????";
            content = "[?????????] ?????? ?????? ??????\n??????: " + address;
            for (Alert alert : alertList) {
                User guardUser = alert.getUser(); // ?????? ????????? ????????? ?????? ??????
                String fcmToken = guardUser.getFcmToken();
                FCMService.sendFCMMessage(fcmToken, body); // fcm???????????? ??????
                verificationService.sendSMS(guardUser.getPhone(), content);
            }

            return user.getId();

        }catch (Exception e){
            return null;
        }
    }

    public Long addFCMToken(String token, FCMReqDto fcmResDto) throws Exception {

        try{
            User user = util.findUserByPhone(decodeToken(token)); // ???????????? ????????? ????????? id??? ??????
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

        // ?????? ???????????? ?????? ????????? ??????
        List<Opguard> OpUserList = opGuardRepository.findAllByUser(user);

        // ?????? ?????? ????????? ?????? ??????-????????? ?????? ?????? ??????
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

        // ?????? ??????: ???????????? ????????? ??????
        School userSchool = user.getSchool(); // ?????? ????????? ?????? ????????? ?????? ID

        User userTeacher = userRepository.findBySchoolAndRole(userSchool, "??????"); // ????????? ID ??????

        List<Coguard> CoUserList = coGuardRepository.findAllByUser(userTeacher);

        // ?????? ?????? ????????? ?????? ??????-????????? ?????? ?????? ??????
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