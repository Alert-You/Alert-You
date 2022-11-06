package com.ssafy.alertyou.alert.controller;

import com.ssafy.alertyou.alert.service.AlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/alert")
public class AlertController {

    private final AlertService alertService;

    @GetMapping(value = "/list")
    public ResponseEntity<Map<String, Object>> AlertList(@RequestParam("userId") long id) throws Exception{
        return alertService.getAlertList(id);
    }

    @PutMapping(value = "/check")
    public ResponseEntity<Map<String, Object>> AlertModify(@RequestParam("alertId") long id) throws Exception{
        return alertService.modifyAlert(id);
    }

    @PutMapping(value = "/allcheck")
    public ResponseEntity<Map<String, Object>> AlertListModify(@RequestParam("userId") long id) throws Exception{
        return alertService.modifyAlertList(id);
    }
}
