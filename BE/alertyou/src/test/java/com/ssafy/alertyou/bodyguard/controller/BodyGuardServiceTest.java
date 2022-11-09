package com.ssafy.alertyou.bodyguard.controller;

import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.bodyguard.repository.CoGuardRepository;
import com.ssafy.alertyou.bodyguard.repository.OpGuardRepository;
import com.ssafy.alertyou.bodyguard.service.BodyGuardService;
import org.junit.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class BodyGuardServiceTest  {

    @Autowired
    private OpGuardRepository opGuardRepository;
    @Autowired
    private CoGuardRepository coGuardRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BodyGuardService bodyGuardService;

    @AfterEach
    public void clean(){
        opGuardRepository.deleteAll();
        coGuardRepository.deleteAll();
        userRepository.deleteAll();
    }


    @Test
    @DisplayName("보디가드 등록 및 해제 테스트")
    public void addBodyGuardTest(){
        // given
        BodyGuardReqDto bodyGuardReqDto = new BodyGuardReqDto(1,2);
        // when
        // then
    }
}
