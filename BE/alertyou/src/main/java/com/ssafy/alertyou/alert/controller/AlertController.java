package com.ssafy.alertyou.alert.controller;

import com.ssafy.alertyou.alert.service.AlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static com.ssafy.alertyou.util.Util.getResponseEntity;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/alert")
public class AlertController {

    private final AlertService alertService;

    @GetMapping(value = "/list")
    public ResponseEntity<Map<String, Object>> AlertList(@RequestHeader(value = "Authorization") String token) throws Exception{
        return alertService.getAlertList(token);
    }

    @PutMapping(value = "/check")
    public ResponseEntity<Map<String, Object>> AlertModify(@RequestParam("alertId") long id) throws Exception{
        return getResponseEntity("success", alertService.modifyAlert(id));
    }

    @PutMapping(value = "/allcheck")
    public ResponseEntity<Map<String, Object>> AlertListModify(@RequestHeader(value = "Authorization") String token) throws Exception{
        return getResponseEntity("success", alertService.modifyAlertList(token));
    }


}
