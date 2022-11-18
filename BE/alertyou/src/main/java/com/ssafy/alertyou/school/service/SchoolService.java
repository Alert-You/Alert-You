package com.ssafy.alertyou.school.service;

import com.ssafy.alertyou.school.dto.SchoolSearchResDto;

import java.util.ArrayList;
import java.util.List;

public interface SchoolService {
    public List<SchoolSearchResDto> getSchools(String word) throws Exception;
    public ArrayList<ArrayList<String>> getGradesAndClasses(String token, String name, String address) throws Exception;

    public Long getSchoolsNumber(String name,String address, int grade, String classRoom) throws Exception;

    }