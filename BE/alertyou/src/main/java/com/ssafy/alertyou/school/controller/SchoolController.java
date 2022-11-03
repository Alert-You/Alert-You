package com.ssafy.alertyou.school.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/school")
public class SchoolController {
    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> getSchools(@RequestParam String word) throws Exception {
        return null;
    }

    @GetMapping("")
    public ResponseEntity<Map<String, Object>> getGradeAndClassRoom(@RequestParam String name) throws Exception {
        return null;
    }

    @GetMapping("/check")
    public List<String> checkFuntion(@RequestParam String word) throws Exception{
        return null;
    }

}
