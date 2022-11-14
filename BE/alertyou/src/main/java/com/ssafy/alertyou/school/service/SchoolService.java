package com.ssafy.alertyou.school.service;

import com.ssafy.alertyou.school.dto.SchoolSearchResDto;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface SchoolService {
    public List<SchoolSearchResDto> getSchools(String word) throws Exception;
    public ArrayList<ArrayList<String>> getGradesAndClasses(String token, String name, String address) throws Exception;

    public Long getSchoolsNumber(String name,String address, int grade, String classRoom) throws Exception;

    }