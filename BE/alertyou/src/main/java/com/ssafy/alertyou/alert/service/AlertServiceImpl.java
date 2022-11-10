package com.ssafy.alertyou.alert.service;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.jwt.JwtProperties;
import com.ssafy.alertyou.account.jwt.JwtTokenProvider;
import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.alert.dto.AlertResDto;
import com.ssafy.alertyou.alert.entity.Alert;
import com.ssafy.alertyou.alert.repository.AlertRepository;
import com.ssafy.alertyou.report.dto.LocationReqDto;
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

    public ResponseEntity<Map<String, Object>> getAlertList(String token) throws Exception{

        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();

        List<AlertResDto> read = new ArrayList<>();
        List<AlertResDto> unRead = new ArrayList<>();

        User user = findUserByPhone(decodeToken(token));

        List<Alert> unreadList = alertRepository.findAllByUserAndChecked(user, false);
        List<Alert> readList = alertRepository.findAllByUserAndChecked(user, true);

        try{
            for(Alert alert : unreadList){
                Report alertReport = alert.getReport();
                unRead.add(new AlertResDto(alertReport, alert));

            }

            for(Alert alert : readList){
                Report alertReport = alert.getReport();
                read.add(new AlertResDto(alertReport, alert));

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

    public ResponseEntity<Map<String, Object>> modifyAlertList(String token) throws Exception {
        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();

        User user = findUserByPhone(decodeToken(token));
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


    public Alert findAlert(long id){
        return alertRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Alert Not Found"));
    }

    public List<Alert> findAlertList(User user){
        return alertRepository.findAllByUser(user);
    }

    public User findUserByPhone(String phone){
        return userRepository.findByPhone(phone);
    }

    public String decodeToken(String token) throws Exception{
        JWTVerifier jwtVerifier = JwtTokenProvider.getVerifier(); // 토큰 검증을 실시
        DecodedJWT decodedJWT = jwtVerifier.verify(token.replace(JwtProperties.TOKEN_PREFIX, "")); // 토큰에서 Bearer 를 제거함
        return decodedJWT.getSubject(); // 디코딩한 JWT 토큰에서 핸드폰 번호를 가져옴
    }
}
