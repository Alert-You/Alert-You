package com.ssafy.alertyou.school.service;

import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.school.dto.SchoolSearchResDto;
import com.ssafy.alertyou.school.entity.School;
import com.ssafy.alertyou.school.repository.SchoolRepository;
import com.ssafy.alertyou.util.Util;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.ssafy.alertyou.util.Util.decodeToken;

@Service
@RequiredArgsConstructor
public class SchoolServiceImpl implements SchoolService {

    private final SchoolRepository schoolRepository;
    private final UserRepository userRepository;
    private final Util util;
    private final String SUCCESS = "SUCCESS";
    private final String FAIL = "FAIL";

    public List<SchoolSearchResDto> getSchools(String word) throws Exception {
        try {
            List<School> schools = schoolRepository.findAllByNameContainsOrderByAddress(word);
            Set<SchoolSearchResDto> res = new HashSet<>();
            for (School school : schools) {
                SchoolSearchResDto dto = new SchoolSearchResDto(school);
                if (!res.equals(dto.hashCode())) {
                    res.add(dto);
                }

            }
            List<SchoolSearchResDto> beforeRes = new ArrayList<>(res);
            beforeRes.sort(Comparator.naturalOrder());

            List<SchoolSearchResDto> afterRes = new ArrayList<>();

            if (beforeRes.size() >= 100){
                afterRes = new ArrayList<>(res).subList(0,100);
            }else {
                afterRes = new ArrayList<>(res);
            }

            afterRes.sort(Comparator.naturalOrder());

            return afterRes;
        } catch (Exception e) {
            return null;
        }
    }

    ;

    public ArrayList<ArrayList<String>> getGradesAndClasses(String token,String name, String address) throws Exception {
        try {
            //1.이름을 포함하고 있는 모든 학교들을 뽑기 (학년 및 반별로 나누어져 들어가있기 때문)
            List<School> schools = new ArrayList<>();
            String schoolName = new String();
            if (token != null){
                School school = util.findUserByPhone(decodeToken(token)).getSchool();
                schools = schoolRepository.findAllByNameAndAddress(school.getName(), school.getAddress());
                schoolName = school.getName();
            }else {
                schools = schoolRepository.findAllByNameAndAddress(name, address);
                schoolName = name;
            }
            //2. 리스트 안 리스트형태 생성
            ArrayList<ArrayList<String>> classes = new ArrayList<ArrayList<String>>();
            Boolean isSpecial = false;
            //3. 초등학교라면, 배열 6개 미리 생성 (0~6학년)
            if (schoolName.contains("초등")) {
                for (int i = 1; i <= 6; i++) {
                    ArrayList<String> classRoom = new ArrayList<>();
                    classes.add(classRoom);
                }
                System.out.println(classes.size());
                //4. 중고등학교라면, 배열 3개 미리 생성(0-3학년)
            } else if (schoolName.contains("중학교") || schoolName.contains("고등학교")){
                for (int j = 1; j <= 3; j++) {
                    ArrayList<String> classRoom = new ArrayList<>();
                    classes.add(classRoom);
                }
                //5. 초,중,고등학교도 아닌 학교라면(특수학교)
            }else {
                for (int k = 1; k <= 8; k++ ){
                    ArrayList<String> classRoom = new ArrayList<>();
                    classes.add(classRoom);
                    isSpecial = true;
                }
            }

            //5. schools 객체를 돌며, 학년별 배열에 반을 담아줌
            for (School school : schools) {
                if (isSpecial == false){
                    ArrayList<String> Class = classes.get(school.getGrade()-1);
                    Class.add(school.getClassRoom());
                }else {
                    ArrayList<String> Class = classes.get(school.getGrade());
                    Class.add(school.getClassRoom());
                }

            }

            if (!classes.contains("순회") && isSpecial==false && classes.get(0).get(0).equals("1")) {
                ArrayList<ArrayList<String>> newclasses = new ArrayList<ArrayList<String>>();
                for (List<String> str : classes){
                    //객체 값이 있을 때에만 정렬, 없다면 그대로 다시 추가
                    if (!str.isEmpty()){
                        String[] sArrays = str.toArray(new String[str.size()]);
                        newclasses.add(sort(sArrays));
                    }else {
                        newclasses.add((ArrayList<String>) str);
                    }
                }
                classes = newclasses;
            }
            if (isSpecial == false){
                ArrayList<String> lst = new ArrayList<>();
                classes.addAll(0, Collections.singleton(lst));
            }
            return classes;

        } catch (Exception e) {
            return null;
        }
    }

    public Long getSchoolsNumber(String name,String address, int grade, String classRoom) throws Exception {
        try {
            return findSchool(address, grade,classRoom).getId();
        }catch (Exception e){
            return null;
        }
    }

    public ArrayList<String> sort(String[] sequence){
        int[] nums = Arrays.asList(sequence).stream().mapToInt(Integer::parseInt).toArray();
        Arrays.sort(nums);
        String[] str= Arrays.toString(nums).split("[\\[\\]]")[1].split(", ");
        ArrayList list = new ArrayList(Arrays.asList(str));
        return list;
    }


    public School findSchool(String name, int grade, String classRoom){
        return schoolRepository.findByAddressAndGradeAndClassRoom(name,grade,classRoom)
                .orElseThrow(() -> new IllegalArgumentException("School Not Found"));
    }



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


