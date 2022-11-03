package com.ssafy.alertyou.school.service;

import com.ssafy.alertyou.school.entity.School;
import com.ssafy.alertyou.school.repository.SchoolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SchoolServiceImpl implements SchoolService{

    private final SchoolRepository schoolRepository;


    public ResponseEntity<Map<String, Object>> getSchools(String word) throws Exception{
        List<School> schools = schoolRepository.findAllByNameContainsOrderByAddress(word);




        return null;
    };
    public List<String> getGradesAndClasses(String name) throws Exception{
        List<School> schools = schoolRepository.findAllByName(name);

        List<List<String>> classes = new ArrayList<>();

        for (School school : schools){
            List<String> classRoom = new ArrayList<>();
            if (school.getName().contains("초등")){
                for (int i = 1;i<= 6; i++){
                    if (school.getGrade() == i){
                        classRoom.add(school.getClassRoom());
                    }
                }
            } else {
                for (int j =1 ; j <= 3 ; j++){
                    if (school.getGrade() == j){
                        classRoom.add(school.getClassRoom());
                    }
                }

            }
            String i = String.valueOf(school.getGrade());
        }

        return null;
    };

}
