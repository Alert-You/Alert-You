package com.ssafy.alertyou.school.service;

import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface SchoolService {
    public ResponseEntity<Map<String, Object>> getSchools(String word) throws Exception;
    public List<String> getGradesAndClasses(String name) throws Exception;


}
