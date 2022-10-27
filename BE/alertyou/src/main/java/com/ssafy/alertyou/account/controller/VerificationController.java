package com.ssafy.alertyou.account.controller;

import com.ssafy.alertyou.account.dto.UserSignupReqDto;
import com.ssafy.alertyou.account.service.VerificationService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

@Api(value = "문자 인증번호 발송 API", tags = {"verification"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth/verification")
public class VerificationController {

    private final VerificationService verificationService;

    @GetMapping("/sms")
    public @ResponseBody
    String sendSMS(@RequestParam("phone") String phone) {
        Random rand  = new Random();
        String numStr = "";
        for(int i=0; i<4; i++) {
            String ran = Integer.toString(rand.nextInt(10));
            numStr += ran;
        }
//        System.out.println("수신자 번호 : " + phone);
//        System.out.println("인증번호 : " + numStr);
        verificationService.verifiedPhoneNumber(phone, numStr);
        return numStr;
    }
}
