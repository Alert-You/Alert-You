package com.ssafy.alertyou.school.controller;

import com.ssafy.alertyou.school.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/teacher")
public class TeacherController {
    private final TeacherService teacherService;

    @GetMapping("")
    public ResponseEntity<Map<String, Object>> getClass(@RequestHeader(value = "Authorization") String token, @RequestParam(required = false) Integer grade, String classRoom) throws Exception {
        return teacherService.getClasses(token, grade, classRoom);
    }

    @GetMapping("/student")
    public ResponseEntity<Map<String, Object>> getStudent(@RequestParam(value = "studentId") long id) throws Exception{
        return teacherService.getStudent(id);
    }

}
