package com.ssafy.alertyou.report.service;

import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.alert.entity.Alert;
import com.ssafy.alertyou.alert.repository.AlertRepository;
import com.ssafy.alertyou.bodyguard.entity.Coguard;
import com.ssafy.alertyou.bodyguard.entity.Opguard;
import com.ssafy.alertyou.bodyguard.repository.CoGuardRepository;
import com.ssafy.alertyou.bodyguard.repository.OpGuardRepository;
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

        List<ReportResDto> list = new ArrayList<>();

        User user = findUser(id);

        List<Report> reportlist = reportRepository.findAllByReUser(user);

        for(Report report : reportlist){
            list.add(new ReportResDto(report));
        }

        if (!list.isEmpty()){
            result.put("msg",SUCCESS);
            result.put("reports", list);
            status = HttpStatus.OK;
        } else if(list.isEmpty()){
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
    public ResponseEntity<Map<String, Object>> getReportBodyGuardList(long id) throws Exception{

        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();

        List<ReportResDto> list = new ArrayList<>();

        User user = findUser(id);
        List<Opguard> guardlist = findGuard(user);


        for(Opguard opguard : guardlist){
            User guarduser = opguard.getUser();
            List<Report> reportlist = reportRepository.findAllByReUser(guarduser);

            for(Report report : reportlist){
                list.add(new ReportResDto(report));
            }

        }

        if (!list.isEmpty()){
            result.put("msg",SUCCESS);
            result.put("reports", list);
            status = HttpStatus.OK;
        } else if(list.isEmpty()){
            result.put("msg",FAIL);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(result, status);

    }

    public ResponseEntity<Map<String, Object>> addReportVictim(ReportVictimReqDto reportVictimReqDto) throws Exception{

        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();

        User user = findUser(reportVictimReqDto.getUserId()); // 이거로 가드 id 찾기

        double latitude = reportVictimReqDto.getLatitude();
        double longtitude = reportVictimReqDto.getLongtitude();
        String nowTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")).toString();


        try{
            Report newReport = Report.builder()
                    .reUser(user)
                    .isVictim(true)
                    .noticeDateTime(nowTime)
                    .latitude(latitude)
                    .longtitude(longtitude)
                    .build();

            // 알람 등록: 내가 등록한 가드
            long alertReportId = reportRepository.save(newReport).getId(); // 등록할 신고 ID

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




            
            result.put("msg",SUCCESS);
            status = HttpStatus.OK;

        }catch (Exception e){
            result.put("msg", FAIL);
            result.put("error",e.getStackTrace());
            status = HttpStatus.BAD_REQUEST;

        }

        return new ResponseEntity<>(result, status);
    }

    public ResponseEntity<Map<String, Object>> addReportWitness(ReportWitnessReqDto reportWitnessReqDto) throws Exception{
        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();

        User user = findUser(reportWitnessReqDto.getUserId());

        double latitude = reportWitnessReqDto.getLatitude();
        double longtitude = reportWitnessReqDto.getLongtitude();
        String nowTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")).toString();
        String content = reportWitnessReqDto.getContent();
        String place  = reportWitnessReqDto.getPlace();

        try{
            Report newReport = Report.builder()
                    .reUser(user)
                    .isVictim(false)
                    .noticeDateTime(nowTime)
                    .latitude(latitude)
                    .longtitude(longtitude)
                    .content(content)
                    .place(place)
                    .build();
            reportRepository.save(newReport);

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

}
