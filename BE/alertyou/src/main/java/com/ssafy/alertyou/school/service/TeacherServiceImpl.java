package com.ssafy.alertyou.school.service;


import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.jwt.JwtProperties;
import com.ssafy.alertyou.account.jwt.JwtTokenProvider;
import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.bodyguard.entity.Coguard;
import com.ssafy.alertyou.bodyguard.repository.CoGuardRepository;
import com.ssafy.alertyou.proof.dto.ProofListResDto;
import com.ssafy.alertyou.proof.entity.Proof;
import com.ssafy.alertyou.school.dto.StudentDetailResDto;
import com.ssafy.alertyou.school.dto.StudentListResDto;
import com.ssafy.alertyou.school.entity.School;
import com.ssafy.alertyou.school.repository.SchoolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService{
    private final SchoolRepository schoolRepository;
    private final UserRepository userRepository;

    private final CoGuardRepository coGuardRepository;

    private final String SUCCESS = "SUCCESS";
    private final String FAIL = "FAIL";
    private final String ROLE = "student";
    private final String GUARD = "보디가드";
    private final String STUDENT = "학급원";

    public ResponseEntity<Map<String, Object>> getClasses(String token,Integer grade, String classRoom) throws Exception{
        School school = new School();
        List<StudentListResDto> list = new ArrayList<>();
        User user = findUserByPhone(decodeToken(token));
        //1. 만약 아무것도 들어오지 않는다면(학교이름, 학년, 반 값이 없을 경우), default로 선생님의 반 학생들을 보여줍니다 (token을 활용)
        //1-1 만약 유저가 active true이고, role이 선생님일 때에만 로직이 돌아가게 추후 설정 예정
        //2. else 분기 처리를 좀 더 자세하게 할 지 고민입니당. ex) 학년만 검색했을 때, 학년 전체의 아이들이 나와야하는가? 아니면 반도 입력해달라고 할 것인가?
        //3. 학교 name을 받지 않고도 찾을 수 있는데 (선생님이 조회하니 값이 늘 고정이기 때문, grade와 room 은 변경되지만 학교는 변경되지 않으니까) name을 받을지 말 지 고민입니다
        if (grade == null && classRoom == null){
            school = user.getSchool();
        } else {
            school = findSchool(user.getSchool().getName(), grade, classRoom);
        }
        if (list.isEmpty()){
            List<User> userList = userRepository.findAllBySchoolAndRole(school,ROLE);
            for (User student : userList){
                // user 객체로 기본 정보를 주고, 선생님이 선택한 보디가드인지 확인하는 로직 필요
                // 보디가드 확인하는 로직 : findCoGuard 값이 있다면 true, 없다면 false를 반환하는 함수를 만들어서 넣을 예정
                list.add(new StudentListResDto(student, findGuard(student)));
            }
        }
        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();
        if (!list.isEmpty()){
            result.put("msg",SUCCESS);
            result.put("students", list);
            status = HttpStatus.OK;
        } else if(list.isEmpty()){
            result.put("msg",FAIL);
            status = HttpStatus.BAD_REQUEST;
        }
//        else if (!(grade == null) && classRoom == null){
//            List<School> schools = findSchoolAndGrade(user.getSchool().getName(),grade);
//            for (School school1 : schools){
//                List<User> userList = userRepository.findAllBySchoolAndRole(school1,ROLE);
//                for (User student : userList){
//                    // user 객체로 기본 정보를 주고, 선생님이 선택한 보디가드인지 확인하는 로직 필요
//                    // 보디가드 확인하는 로직 : findCoGuard 값이 있다면 true, 없다면 false를 반환하는 함수를 만들어서 넣을 예정
//                    list.add(new StudentListResDto(student, findGuard(student)));
//                }
//            }
//        }
        return new ResponseEntity<>(result, status);
    }

    public ResponseEntity<Map<String,Object>> getStudent(long id) throws Exception{
        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();
        try {
//        1. id로 findUser 찾기
            User user = findUser(id);
            School school = user.getSchool();
            String role = new String();
//        2. 만약 CoGuard에서 선생님이 지정한 보디가드 일 때, 있다면 role = GUARD & 없다면 role = STUDENT
            if (findGuard(user)==true){
                role = GUARD;
            }else {
                role = STUDENT;
            }
            // String GUARD = '보디가드' & String STUDENT = '학급원'
            //2-1 다른 반 보디가드는 볼 수 없는건가요 ?
                // 2-1-1 만약 다른 반 보디가드를 볼 수 없다면 : findTeacherAndCoGuard 값으로 판단
                // !!2-1-2 만약 다른 반 보디가드를 볼 수 있다면 : findCoGuard에서 값으로 판단 (우선 진행)
//        3. School school = findSchool(user.getSchool)
            //3-1 String schoolName = school.getName + school.getGrade.toString() +"학년" + school.getRoom.toString()+"반";
            String schoolName = school.getName() + " " + String.valueOf(school.getGrade()) + "학년 " + String.valueOf(school.getClassRoom()) + "반";
//        4. 분기처리 하고 들어갈 것 : StudentDetailResDto(user,role,schoolName)
            result.put("msg",SUCCESS);
            result.put("student", new StudentDetailResDto(user,schoolName,role));
            status = HttpStatus.OK;
        } catch (Exception e){
            result.put("msg",FAIL);
            status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<>(result, status);
    }

    public ResponseEntity<Map<String, Object>> removeStudent(long id) throws Exception{
        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();
        try {
            User user = findUser(id);
            School school = findSchoolById(133683);
            user.deleteSchool(user,school);
            userRepository.save(user);

            result.put("msg",SUCCESS);
            status = HttpStatus.OK;
        }catch (Exception e){
            result.put("msg",FAIL);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(result, status);
    }




    public School findSchool(String name, int grade, String classRoom){
        return schoolRepository.findByNameAndGradeAndClassRoom(name,grade,classRoom)
                .orElseThrow(() -> new IllegalArgumentException("School Not Found"));
    }

    public List<School> findSchoolAndGrade(String name, int grade){
        return schoolRepository.findAllByNameAndGrade(name,grade);
    }

    public School findSchoolById(long id){
        return schoolRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("School Not Found"));
    }

    public Boolean findGuard(User user){
        if (!coGuardRepository.findByCoGuard(user).isPresent()){
            return false;
        }else {
            return true;
        }
    }

    public User findUser(long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User Not Found"));
    }

    public User findUserByPhone(String phone){
        return userRepository.findByPhone(phone);
    }

    public String decodeToken(String token) throws Exception{
        JWTVerifier jwtVerifier = JwtTokenProvider.getVerifier(); // 토큰 검증을 실시
        DecodedJWT decodedJWT = jwtVerifier.verify(token.replace(JwtProperties.TOKEN_PREFIX, "")); // 토큰에서 Bearer 를 제거함
        return decodedJWT.getSubject(); // 디코딩한 JWT 토큰에서 핸드폰 번호를 가져옴
    }
}
