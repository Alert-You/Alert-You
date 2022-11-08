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
    public ResponseEntity<Map<String, Object>> SchoolList(@RequestParam String word) throws Exception {
        return schoolService.getSchools(word);
    }

    @GetMapping("")
    public ResponseEntity<Map<String, Object>> GradeAndClassRoomList(@RequestParam String name) throws Exception {
        return schoolService.getGradesAndClasses(name);
    }

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> SchoolNumberDetail(@RequestParam String name, int grade, String classRoom) throws Exception {
        return schoolService.getSchoolsNumber(name, grade, classRoom);
    }

}
