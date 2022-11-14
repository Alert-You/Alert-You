package com.ssafy.alertyou.school.service;

import com.ssafy.alertyou.school.dto.StudentDetailResDto;
import com.ssafy.alertyou.school.dto.StudentListResDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;


public interface TeacherService {

    public List<StudentListResDto> getClasses(String token, Integer grade, String classRoom) throws Exception;
    public StudentDetailResDto getStudent(long id) throws Exception;

    public Long removeStudent(long id) throws Exception;

}
