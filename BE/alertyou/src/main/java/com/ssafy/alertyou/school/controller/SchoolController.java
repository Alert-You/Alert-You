package com.ssafy.alertyou.school.controller;


import com.ssafy.alertyou.school.service.SchoolService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/school")
public class SchoolController {

    private final SchoolService schoolService;
    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> getSchools(@RequestParam String word) throws Exception {
        return schoolService.getSchools(word);
    }

    @GetMapping("")
    public ResponseEntity<Map<String, Object>> getGradeAndClassRoom(@RequestParam String name) throws Exception {
        return schoolService.getGradesAndClasses(name);
    }

}
