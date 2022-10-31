package com.ssafy.alertyou.school.service;


import com.ssafy.alertyou.school.repository.SchoolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService{
    private final SchoolRepository schoolRepository;
    public ResponseEntity<Map<String, Object>> getClasses(String token, String name, Integer grade, Integer room) throws Exception{
        if (name.equals(null) && grade.equals(null) && room.equals(null)){
            return null;
        }

        return null;
    }


//    public findSchool()
}
