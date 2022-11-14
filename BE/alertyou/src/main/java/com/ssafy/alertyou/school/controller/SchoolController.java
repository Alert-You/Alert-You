package com.ssafy.alertyou.school.controller;


import com.ssafy.alertyou.school.service.SchoolService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.ssafy.alertyou.util.Util.getResponseEntity;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/school")
public class SchoolController {
    private final SchoolService schoolService;
    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> SchoolList(@RequestParam String word) throws Exception {
        return getResponseEntity("schools", schoolService.getSchools(word));
    }

    @GetMapping("")
    public ResponseEntity<Map<String, Object>> GradeAndClassRoomList(@RequestHeader(required = false, value = "Authorization") String token, @RequestParam(required = false) String name, String address) throws Exception {
        return getResponseEntity("classes",schoolService.getGradesAndClasses(token, name, address));
    }

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> SchoolNumberDetail(@RequestParam String name, String address, int grade, String classRoom) throws Exception {
        return getResponseEntity("schoolId",schoolService.getSchoolsNumber(name, address, grade, classRoom));

    }



}
