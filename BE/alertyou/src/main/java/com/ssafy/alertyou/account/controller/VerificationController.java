package com.ssafy.alertyou.account.controller;

import com.ssafy.alertyou.account.dto.VerificationResDto;
import com.ssafy.alertyou.account.service.VerificationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Random;

@Api(value = "문자 인증번호 발송 API", tags = {"verification"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth/verification")
public class VerificationController {

    private final VerificationService verificationService;

    @PostMapping("/sms")
    @ApiOperation(value = "인증 번호 요청", notes = "휴대전화 번호를 입력하여 인증 번호를 요청한다.")
    public ResponseEntity<VerificationResDto> sendSMS(@RequestParam("phone") String phone) { // , HttpServletRequest request
        String certRandNum = verificationService.getRandomVerificationNumber();

        verificationService.sendSMS(phone, certRandNum);
//        HttpSession session = request.getSession();
//        session.setAttribute("certNum", numStr);
        return ResponseEntity.ok().body(VerificationResDto.result(200, "인증 번호 발송 성공", certRandNum));
    }
}
