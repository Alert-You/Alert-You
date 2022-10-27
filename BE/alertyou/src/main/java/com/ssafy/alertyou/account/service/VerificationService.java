package com.ssafy.alertyou.account.service;

import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class VerificationService {

    public void verifiedPhoneNumber(String phoneNumber, String cerNum) {

        String api_key = "NCS4WSK7XB23SLBE";
        String api_secret = "NAUCB7Z9QTNZL11HD1Y2HC5XLMGVUMN4";
        Message coolSMS = new Message(api_key, api_secret);

        // 4 params(to, from, type, text) are mandatory. must be filled
        HashMap<String, String> params = new HashMap<String, String>();
        params.put("to", phoneNumber);    // 수신전화번호
        params.put("from", "phoneNumber");    // 발신전화번호(테스트시에는 발신, 수신 둘다 본인 번호로 하면 됨)
        params.put("type", "SMS");
        params.put("text", "Alert-You 인증번호 발송 : 인증번호는" + "["+cerNum+"]" + "입니다.");
        params.put("app_version", "test app 1.2"); // application name and version

        try {
            JSONObject obj = (JSONObject) coolSMS.send(params);
            System.out.println(obj.toString());
        } catch (CoolsmsException e) {
            System.out.println(e.getMessage());
            System.out.println(e.getCode());
        }

    }
}
