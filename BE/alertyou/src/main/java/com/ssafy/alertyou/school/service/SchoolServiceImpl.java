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
    public ArrayList<ArrayList<String>> getGradesAndClasses(String name) throws Exception{
        List<School> schools = schoolRepository.findAllByName(name);

        ArrayList<ArrayList<String>> classes = new ArrayList<ArrayList<String>>();

        if (name.contains("초등")){
            for (int i = 1;i<= 6; i++){
                ArrayList<String> classRoom = new ArrayList<>();
                classes.add(classRoom);
            }
        } else {
            for (int j =1 ; j <= 3 ; j++){
                ArrayList<String> classRoom = new ArrayList<>();
                classes.add(classRoom);
            }
        }
        System.out.println(classes.size());

        for (School school : schools){
            ArrayList<String> Class  = classes.get(school.getGrade()-1);
            Class.add(school.getClassRoom());
        }

        return classes;
    };

    public ArrayList<ArrayList<String>> getTest(String name) throws Exception {
        ArrayList<ArrayList<String>> classes = new ArrayList<ArrayList<String>>();

        for (int i = 1; i <= 3; i++){
            ArrayList<String> ik = new ArrayList<String>();
            classes.add(ik);
        }

        ArrayList<String> ca  = classes.get(0);
        ca.add("1");
        classes.add(ca);

        System.out.println(classes.get(0));
        System.out.println(classes.get(1));
        System.out.println(classes.get(2));

        System.out.println("넘어왔나");
        return null;
    }

    }
