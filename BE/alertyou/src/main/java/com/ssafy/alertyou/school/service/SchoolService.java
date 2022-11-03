package com.ssafy.alertyou.school.service;

import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface SchoolService {
    public ResponseEntity<Map<String, Object>> getSchools(String word) throws Exception;
    public ArrayList<ArrayList<String>> getGradesAndClasses(String name) throws Exception;

    public ArrayList<ArrayList<String>> getTest(String name) throws Exception;


    }
