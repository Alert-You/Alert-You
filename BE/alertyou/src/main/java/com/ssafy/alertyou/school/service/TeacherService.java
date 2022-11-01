package com.ssafy.alertyou.school.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;


public interface TeacherService {
    public ResponseEntity<Map<String, Object>> getClasses(String token, String name, Integer grade, Integer room) throws Exception;
    public ResponseEntity<Map<String, Object>> getStudent(long id) throws Exception;


}
