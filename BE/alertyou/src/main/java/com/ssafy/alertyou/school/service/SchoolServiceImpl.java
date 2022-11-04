package com.ssafy.alertyou.school.service;

import com.ssafy.alertyou.school.dto.SchoolSearchResDto;
import com.ssafy.alertyou.school.entity.School;
import com.ssafy.alertyou.school.repository.SchoolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SchoolServiceImpl implements SchoolService{

    private final SchoolRepository schoolRepository;
    private final String SUCCESS = "SUCCESS";
    private final String FAIL = "FAIL";

    public ResponseEntity<Map<String, Object>> getSchools(String word) throws Exception{
        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();
        try {
            List<School> schools = schoolRepository.findAllByNameContainsOrderByAddress(word);
            Set<SchoolSearchResDto> res = new HashSet<>();
            for (School school : schools) {
                SchoolSearchResDto dto = new SchoolSearchResDto(school);
                if (!res.equals(dto.hashCode())){
                    res.add(dto);
                }

            }
            List<SchoolSearchResDto> ress = new ArrayList<>(res);
            ress.sort(Comparator.naturalOrder());
            Collections.sort(ress);
            result.put("msg",SUCCESS);
            result.put("schools", ress);
            status = HttpStatus.OK;
        }catch (Exception e){
            result.put("msg", FAIL);
            status = HttpStatus.BAD_REQUEST;
        }


        return new ResponseEntity<>(result, status);
    };
    public ResponseEntity<Map<String, Object>> getGradesAndClasses(String name) throws Exception{
        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();
        try {
            //1.이름을 포함하고 있는 모든 학교들을 뽑기 (학년 및 반별로 나누어져 들어가있기 때문)
            List<School> schools = schoolRepository.findAllByName(name);

            //2. 리스트 안 리스트형태 생성
            ArrayList<ArrayList<String>> classes = new ArrayList<ArrayList<String>>();

            //3. 초등학교라면, 배열 6개 미리 생성 (1~6학년)
            if (name.contains("초등")){
                for (int i = 1;i<= 6; i++){
                    ArrayList<String> classRoom = new ArrayList<>();
                    classes.add(classRoom);
                }
                //4. 중고등학교라면, 배열 3개 미리 생성(1-3학년)
            } else {
                for (int j =1 ; j <= 3 ; j++){
                    ArrayList<String> classRoom = new ArrayList<>();
                    classes.add(classRoom);
                }
            }
            //5. schools 객체를 돌며, 학년별 배열에 반을 담아줌
            for (School school : schools){
                ArrayList<String> Class  = classes.get(school.getGrade()-1);
                Class.add(school.getClassRoom());
            }

            result.put("msg",SUCCESS);
            result.put("classes", classes);
            status = HttpStatus.OK;

        }catch (Exception e){
            result.put("msg", FAIL);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(result, status);
    }

//    public ArrayList<ArrayList<String>> getTest(String name) throws Exception {
//        ArrayList<ArrayList<String>> classes = new ArrayList<ArrayList<String>>();
//
//        for (int i = 1; i <= 3; i++){
//            ArrayList<String> ik = new ArrayList<String>();
//            classes.add(ik);
//        }
//
//        ArrayList<String> ca  = classes.get(0);
//        ca.add("1");
//        classes.add(ca);
//
//        System.out.println(classes.get(0));
//        System.out.println(classes.get(1));
//        System.out.println(classes.get(2));
//
//        System.out.println("넘어왔나");
//        return null;
//    }

    }
