package com.ssafy.alertyou.bodyguard.controller;

import com.ssafy.alertyou.bodyguard.service.BodyGuardService;
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
public class BodyGuardController {
    private final BodyGuardService bodyGuardService;

    @GetMapping(value = "/list")
    public ResponseEntity<Map<String, Object>> BodyGuardList(@RequestParam("user_id") long id) throws Exception{
        return bodyGuardService.getBodyGuard(id);
    }
}
