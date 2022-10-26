package com.ssafy.alertyou.account.service;

import com.ssafy.alertyou.account.dto.UserSignupReqDto;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
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
                        .role("student")
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
        // 바꾸려는 핸드폰 번호를 가진 유저가 없으면 회원정보 수정 진행
        if (userRepository.findByPhone(newPhone) == null) {
            String newPassword = bCryptPasswordEncoder.encode(userSignupReqDto.getPassword());
            user.updateAccount(userSignupReqDto, newPassword);
            userRepository.save(user);
            return true;
        }
        return false;
    }
    
    
    // 유저 삭제
    public void removeUser(User user) {
        userRepository.delete(user);
    }

}
