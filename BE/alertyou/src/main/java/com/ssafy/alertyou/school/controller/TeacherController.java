package com.ssafy.alertyou.school.controller;

import com.ssafy.alertyou.school.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static com.ssafy.alertyou.util.Util.getResponseEntity;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    private final TeacherService teacherService;


    @GetMapping("")
    public ResponseEntity<Map<String, Object>> StudentList(@RequestHeader(value = "Authorization") String token, @RequestParam(required = false) Integer grade, String classRoom) throws Exception {
        return getResponseEntity("students",teacherService.getClasses(token, grade, classRoom));

    }

    @GetMapping("/student")
    public ResponseEntity<Map<String, Object>> StudentDetails(@RequestParam(value = "studentId") long id) throws Exception{
        return getResponseEntity("student", teacherService.getStudent(id));
    }

    @DeleteMapping("/student")
    public ResponseEntity<Map<String, Object>> StudentRemove(@RequestParam(value = "studentId") long id) throws Exception{
        return getResponseEntity("success",teacherService.removeStudent(id));
    }


}
