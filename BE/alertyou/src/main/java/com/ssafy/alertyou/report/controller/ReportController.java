package com.ssafy.alertyou.report.controller;

import com.ssafy.alertyou.report.dto.ReportVictimReqDto;
import com.ssafy.alertyou.report.dto.ReportWitnessReqDto;
import com.ssafy.alertyou.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/report")
public class ReportController {

    private final ReportService reportService;

    @GetMapping(value = "/list")
    public ResponseEntity<Map<String, Object>> ReportList(@RequestParam("userId") long id) throws Exception{
        return reportService.getReportList(id);
    }

    @GetMapping(value = "/detail")
    public ResponseEntity<Map<String, Object>> ReportDetails(@RequestParam("reportId") long id) throws Exception{
        return reportService.getReportDetail(id);
    }

    @GetMapping(value = "/bodyguardlist")
    public ResponseEntity<Map<String, Object>> ReportBodyGuardList(@RequestParam("guardId") long id) throws Exception{
        return reportService.getReportBodyGuardList(id);
    }

    @PostMapping("/victim")
    public ResponseEntity<Map<String, Object>> ReportVictimAdd(@RequestBody ReportVictimReqDto reportVictimReqDto) throws Exception {
        return reportService.addReportVictim(reportVictimReqDto);
    }

    @PostMapping("/witness")
    public ResponseEntity<Map<String, Object>> ReportWitnessAdd(@RequestBody ReportWitnessReqDto reportWitnessReqDto) throws Exception {
        return reportService.addReportWitness(reportWitnessReqDto);
    }
}
