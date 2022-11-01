package com.ssafy.alertyou.school.service;


import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.jwt.JwtProperties;
import com.ssafy.alertyou.account.jwt.JwtTokenProvider;
import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.proof.dto.ProofListResDto;
import com.ssafy.alertyou.proof.entity.Proof;
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

    private final String SUCCESS = "SUCCESS";
    private final String FAIL = "FAIL";
    private final String ROLE = "student";

    public ResponseEntity<Map<String, Object>> getClasses(String token,String name, Integer grade, Integer room) throws Exception{
        School school = new School();
        System.out.println(name);
        //1. 만약 아무것도 들어오지 않는다면(학교이름, 학년, 반 값이 없을 경우), default로 선생님의 반 학생들을 보여줍니다 (token을 활용)
            //1-1 만약 유저가 active true이고, role이 선생님일 때에만 로직이 돌아가게 추후 설정 예정
        //2. else 분기 처리를 좀 더 자세하게 할 지 고민입니당. ex) 학년만 검색했을 때, 학년 전체의 아이들이 나와야하는가? 아니면 반도 입력해달라고 할 것인가?
        //3. 학교 name을 받지 않고도 찾을 수 있는데 (선생님이 조회하니 값이 늘 고정이기 때문, grade와 room 은 변경되지만 학교는 변경되지 않으니까) name을 받을지 말 지 고민입니다
        if (name == null && grade == null && room == null){
            school = findUserByPhone(decodeToken(token)).getSchool();
        } else {
            school = findSchool(name, grade, room);
        }
        List<User> userList = userRepository.findAllBySchoolAndRole(school,ROLE);
        List<StudentListResDto> list = new ArrayList<>();
        for (User user : userList){
            // user 객체로 기본 정보를 주고, 선생님이 선택한 보디가드인지 확인하는 로직 필요
            // 보디가드 확인하는 로직 : findTeacherAndCoGuard 값이 있다면 true, 없다면 false를 반환하는 함수를 만들어서 넣을 예정
            list.add(new StudentListResDto(user, false));
        }

        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();
        if (!list.isEmpty()){
            result.put("msg",SUCCESS);
            result.put("students", list);
            status = HttpStatus.OK;
        } else if(list.isEmpty()){
            result.put("mgs",FAIL);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(result, status);
    }

    public ResponseEntity<Map<String, Object>> getStudent(long id) throws Exception{
//        1. id로 findUser 찾기
//        2. 만약 CoGuard에서 선생님이 지정한 보디가드 일 때, 있다면 role = GUARD & 없다면 role = STUDENT
        // String GUARD = '보디가드' & String STUDENT = '학급원'
            //2-1 다른 반 보디가드는 볼 수 없는건가요 ?
                //2-1-1 만약 다른 반 보디가드를 볼 수 없다면 : findTeacherAndCoGuard 값으로 판단
                //2-1-2 만약 다른 반 보디가드를 볼 수 있다면 : findCoGuard에서 값으로 판단
//        3. School school = findSchool(user.getSchool)
            //3-1 String schoolName = school.getName + school.getGrade.toString() +"학년" + school.getRoom.toString()+"반";
//        4. 분기처리 하고 들어갈 것 : StudentDetailResDto(user,role,schoolName)

        return null;
    }



    public School findSchool(String name, int grade, int room){
        return schoolRepository.findByNameAndGradeAndRoom(name,grade,room)
                .orElseThrow(() -> new IllegalArgumentException("School Not Found"));
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
