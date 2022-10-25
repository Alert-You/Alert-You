package com.ssafy.alertyou.account.service;

import com.ssafy.alertyou.account.dto.UserRequestDto;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.school.entity.School;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    // 회원가입
    public boolean createUser(UserRequestDto userRequestDto) {
        // 핸드폰 번호가 이미 있으면 false
        if (userRepository.findByPhone(userRequestDto.getPhone()) != null) {
            return false;
        }
        // 학교 정보 받아서 넣어야함
        User newUser = User.builder()
                        .phone(userRequestDto.getPhone())
                        .username(userRequestDto.getUsername())
                        .password(passwordEncoder.encode(userRequestDto.getPassword()))
                        .build();

        userRepository.save(newUser);
        return true;
    }





}
