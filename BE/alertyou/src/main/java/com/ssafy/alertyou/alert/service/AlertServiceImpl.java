package com.ssafy.alertyou.alert.service;

import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.alert.dto.AlertResDto;
import com.ssafy.alertyou.alert.entity.Alert;
import com.ssafy.alertyou.alert.repository.AlertRepository;
import com.ssafy.alertyou.report.dto.ReportResDto;
import com.ssafy.alertyou.report.entity.Report;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AlertServiceImpl implements AlertService{

    private final AlertRepository alertRepository;
    private final UserRepository userRepository;
    private final String SUCCESS = "SUCCESS";
    private final String FAIL = "FAIL";

    public ResponseEntity<Map<String, Object>> getAlertList(long id) throws Exception{

        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();

        List<AlertResDto> read = new ArrayList<>();
        List<AlertResDto> unread = new ArrayList<>();

        User user = findUser(id);

        List<Alert> unreadList = alertRepository.findAllByUserAndChecked(user, false);
        List<Alert> readList = alertRepository.findAllByUserAndChecked(user, true);

        try{
            for(Alert alert : unreadList){
                Report alertReport = alert.getReport();
                unread.add(new AlertResDto(alertReport));

            }

            for(Alert alert : readList){
                Report alertReport = alert.getReport();
                read.add(new AlertResDto(alertReport));

            }

            // 최신순 정렬
            read.sort(Comparator.comparing(AlertResDto::getNoticeDateTime).reversed());
            unread.sort(Comparator.comparing(AlertResDto::getNoticeDateTime).reversed());

            result.put("msg", SUCCESS);
            result.put("read", read);
            result.put("unread", unread);
            status = HttpStatus.OK;

        }catch (Exception e){
            result.put("msg", FAIL);
            status = HttpStatus.BAD_REQUEST;

        }

        return new ResponseEntity<>(result, status);


    }

    public ResponseEntity<Map<String, Object>> modifyAlert(long id) throws Exception {

        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();

        Alert checkAlert = findAlert(id);

        try{
            if(!checkAlert.getChecked()){
                checkAlert.updateAlert(true);
                alertRepository.save(checkAlert);
            }

            result.put("msg",SUCCESS);
            status = HttpStatus.OK;

        }catch (Exception e){
            result.put("msg", FAIL);
            status = HttpStatus.BAD_REQUEST;

        }
        return new ResponseEntity<>(result, status);

    }

    public ResponseEntity<Map<String, Object>> modifyAlertList(long id) throws Exception {
        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();

        User user = findUser(id);
        List<Alert> userList = findAlertList(user);

        try{
            for(Alert alert : userList){
                if(!alert.getChecked()){
                    alert.updateAlert(true);
                    alertRepository.save(alert);
                }
            }

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

    public Alert findAlert(long id){
        return alertRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Alert Not Found"));
    }

    public List<Alert> findAlertList(User user){
        return alertRepository.findAllByUser(user);
    }
}
