package com.ssafy.alertyou.bodyguard.controller;

import com.ssafy.alertyou.bodyguard.service.BodyGuardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static com.ssafy.alertyou.util.Util.getResponseEntity;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/bodyguard")
public class BodyGuardController {
    private final BodyGuardService bodyGuardService;

    @PostMapping("")
    public ResponseEntity<Map<String, Object>> BodyGuardSave(@RequestHeader(value = "Authorization") String token, @RequestParam("guardId") long id) throws Exception {
        return getResponseEntity("success", bodyGuardService.addBodyGuard(token, id));
    }

    @GetMapping(value = "/list")
    public ResponseEntity<Map<String, Object>> BodyGuardList(@RequestParam("userId") long id) throws Exception{
        return getResponseEntity("bodyguards", bodyGuardService.getBodyGuard(id));
    }
}
