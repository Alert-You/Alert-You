package com.ssafy.alertyou.account.service;

import com.ssafy.alertyou.account.dto.UserInfoResDto;
import com.ssafy.alertyou.account.dto.UserSignupReqDto;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.bodyguard.repository.CoGuardRepository;
import com.ssafy.alertyou.school.entity.School;
import com.ssafy.alertyou.school.repository.SchoolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CoGuardRepository coGuardRepository;
    private final SchoolRepository schoolRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    // 회원가입
    public boolean createUser(UserSignupReqDto userRequestDto) {
        // 핸드폰 번호가 이미 있으면 false
        if (userRepository.findByPhone(userRequestDto.getPhone()) != null) {
            return false;
        }
        // 학교 정보 받아서 넣어야함
        User newUser = User.builder()
                        .phone(userRequestDto.getPhone())
                        .username(userRequestDto.getUsername())
                        .password(bCryptPasswordEncoder.encode(userRequestDto.getPassword()))
                        .school(schoolRepository.getById(userRequestDto.getSchoolId()))
                        .role("학생")
                        .active(true)
                        .build();
        userRepository.save(newUser);
        return true;
    }

    // 휴대전화 번호로 유저 조회
    public User getUserByPhone(String phone) {
        return userRepository.findByPhone(phone);
    }
    
    // 유저 정보 수정(setter 사용을 피하기 위해 회원 정보 수정 로직을 엔티티에 추가함)
    public boolean modifyUserInfo(User user, UserSignupReqDto userSignupReqDto) {
        String newPhone = userSignupReqDto.getPhone();
        // 바꾸려는 핸드폰 번호를 가진 유저가 없거나 자기 자신의 번호라면 회원정보 수정 진행
        if (user.getPhone().equals(newPhone) || userRepository.findByPhone(newPhone) == null) {
            String newPassword = bCryptPasswordEncoder.encode(userSignupReqDto.getPassword());
            School school = schoolRepository.getById(userSignupReqDto.getSchoolId());
            user.updateAccount(userSignupReqDto, school, newPassword);
            userRepository.save(user);
            return true;
        }
        return false;
    }
    
    
    // 유저 삭제(setter 사용을 피하기 위해 회원 정보 수정 로직을 엔티티에 추가함)
    public void removeUser(User user) {
        user.deleteAccount();
        userRepository.save(user); // userRepository.delete(user);
    }
    
    // 유저 정보 조회
    public UserInfoResDto getUserInfo(String phone) {
        User user = userRepository.findByPhone(phone);
        boolean ret = coGuardRepository.findAllByCoGuard(user).isEmpty(); // 보디가드 역할인지 확인
        String role = user.getRole();
        School school = user.getSchool();
        if (!ret && role.equals("학생")) { // 학생이면서 보디가드 역할을 부여 받았으면 보디가드를 부여
            role = "보디가드";
        }
        String schoolName = school.getName() + " " + String.valueOf(school.getGrade()) + "학년 " + String.valueOf(school.getClassRoom()) + "반";
        long schoolId = school.getId();
        return UserInfoResDto.result(200, "유저 정보 조회 완료", schoolId, schoolName, user.getUsername(), role, phone);
    }

    // 유저 삭제 로직(나중에 삭제)
    public boolean removeUser(String phone) {
        User user = userRepository.findByPhone(phone);
        if (user == null) {
            return false;
        }
        userRepository.delete(user);
        return true;
    }

}
