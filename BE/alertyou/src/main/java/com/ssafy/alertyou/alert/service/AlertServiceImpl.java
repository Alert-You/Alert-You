package com.ssafy.alertyou.alert.service;

import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.alert.dto.AlertResDto;
import com.ssafy.alertyou.alert.entity.Alert;
import com.ssafy.alertyou.alert.repository.AlertRepository;
import com.ssafy.alertyou.report.entity.Report;
import com.ssafy.alertyou.util.Util;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;

import static com.ssafy.alertyou.util.Util.decodeToken;

@Service
@RequiredArgsConstructor
public class AlertServiceImpl implements AlertService{

    private final AlertRepository alertRepository;
    private final String SUCCESS = "SUCCESS";
    private final String FAIL = "FAIL";
    private final Util util;

    public ResponseEntity<Map<String, Object>> getAlertList(String token) throws Exception{

        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();

        List<AlertResDto> read = new ArrayList<>();
        List<AlertResDto> unRead = new ArrayList<>();

        User user = util.findUserByPhone(decodeToken(token));

        List<Alert> unreadList = alertRepository.findAllByUserAndChecked(user, false);
        List<Alert> readList = alertRepository.findAllByUserAndChecked(user, true);

        LocalDateTime endDate = LocalDateTime.now(); // 현재 날짜 가져오기

        try{
            for(Alert alert : unreadList){
                Report alertReport = alert.getReport();

                // 해당 알림의 신고 날짜를 가져옴
                String noticeTime = alertReport.getNoticeDateTime();
                // 비교 가능한 날짜로 가져오기
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
                LocalDateTime startDate = LocalDateTime.parse(noticeTime, formatter);
                
                // 날짜 비교
                long day = ChronoUnit.DAYS.between(startDate, endDate);

                if(day <= 1){
                    unRead.add(new AlertResDto(alertReport, alert));
                }
            }

            for(Alert alert : readList){
                Report alertReport = alert.getReport();

                // 해당 알림의 신고 날짜를 가져옴
                String noticeTime = alertReport.getNoticeDateTime();
                // 비교 가능한 날짜로 가져오기
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
                LocalDateTime startDate = LocalDateTime.parse(noticeTime, formatter);

                // 날짜 비교
                long day = ChronoUnit.DAYS.between(startDate, endDate);

                if(day <= 1){
                    read.add(new AlertResDto(alertReport, alert));
                }
            }

            // 최신순 정렬
            read.sort(Comparator.comparing(AlertResDto::getNoticeDateTime).reversed());
            unRead.sort(Comparator.comparing(AlertResDto::getNoticeDateTime).reversed());

            result.put("msg", SUCCESS);
            result.put("read", read);
            result.put("unRead", unRead);
            status = HttpStatus.OK;

        }catch (Exception e){
            result.put("msg", FAIL);
            status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<>(result, status);


    }

    public Long modifyAlert(long id) throws Exception {

        Alert checkAlert = findAlert(id);

        try{
            if(!checkAlert.getChecked()){
                checkAlert.updateAlert(true);
                alertRepository.save(checkAlert);
            }

            return id;

        }catch (Exception e){
            return null;
        }

    }

    public Long modifyAlertList(String token) throws Exception {

        User user = util.findUserByPhone(decodeToken(token));
        List<Alert> userList = findAlertList(user);

        try{
            for(Alert alert : userList){
                if(!alert.getChecked()){
                    alert.updateAlert(true);
                    alertRepository.save(alert);
                }
            }

            return user.getId();

        }catch (Exception e){
            return null;
        }

    }

    public Alert findAlert(long id){
        return alertRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Alert Not Found"));
    }

    public List<Alert> findAlertList(User user){
        return alertRepository.findAllByUser(user);
    }


}
