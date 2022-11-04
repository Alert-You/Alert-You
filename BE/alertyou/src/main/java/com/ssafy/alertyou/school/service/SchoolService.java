package com.ssafy.alertyou.school.service;

import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface SchoolService {
    public ResponseEntity<Map<String, Object>> getSchools(String word) throws Exception;
    public ResponseEntity<Map<String, Object>> getGradesAndClasses(String name) throws Exception;

    }
