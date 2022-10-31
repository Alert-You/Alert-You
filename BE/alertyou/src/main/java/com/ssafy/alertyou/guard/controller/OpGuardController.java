package com.ssafy.alertyou.guard.controller;

import com.ssafy.alertyou.guard.service.OpGuardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/bodyguard")
public class OpGuardController {
    private final OpGuardService opGuardService;

    @GetMapping(value = "/list")
    public ResponseEntity<Map<String, Object>> OpGuardList(@RequestParam("user_id") long id) throws Exception{
        return opGuardService.getOpGuard(id);
    }
}
