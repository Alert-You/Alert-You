package com.ssafy.alertyou.school.service;

import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface SchoolService {
    public ResponseEntity<Map<String, Object>> getSchools(String word) throws Exception;
    public ResponseEntity<Map<String, Object>> getGradesAndClasses(String token, String name, String address) throws Exception;

    public ResponseEntity<Map<String, Object>> getSchoolsNumber(String name,String address, int grade, String classRoom) throws Exception;

    }