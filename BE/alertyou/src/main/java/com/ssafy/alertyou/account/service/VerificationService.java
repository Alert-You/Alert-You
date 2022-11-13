package com.ssafy.alertyou.account.service;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class VerificationService {

    @Value("${naver.cloud.sms.accesskey}")
    private String accessKey; // 네이버 클라우드 플랫폼 회원에게 발급되는 개인 인증키 // Access Key : https://www.ncloud.com/mypage/manage/info > 인증키 관리 > Access Key ID

    @Value("${naver.cloud.sms.secretkey}")
    private String secretKey; // 개인 인증키 옆에 [보기]를 통해 얻을 수 있는 Secret Key: https://www.ncloud.com/mypage/manage/info > 인증키 관리 > Secret Key

    @Value("${naver.cloud.sms.serviceid}")
    private String serviceId; // 프로젝트에 할당된 SMS 서비스 ID // service ID : https://console.ncloud.com/sens/project > Simple & ... > Project > 서비스 ID

    // 랜덤 인증번호를 생성함
    public String getRandomVerificationNumber() {
        Random rand  = new Random();
        String cerNum = "";
        for(int i=0; i<6; i++) {
            String ran = Integer.toString(rand.nextInt(10));
            cerNum += ran;
        }
        return cerNum;
    }

    public String makeSignature(String url, String timestamp, String method, String accessKey, String secretKey) throws NoSuchAlgorithmException, InvalidKeyException {
        String space = " "; // one space
        String newLine = "\n"; // new line

        String message = new StringBuilder()
                .append(method)
                .append(space)
                .append(url)
                .append(newLine)
                .append(timestamp)
                .append(newLine)
                .append(accessKey)
                .toString();

        SecretKeySpec signingKey;
        String encodeBase64String;
        try {
            signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(signingKey);
            byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
            encodeBase64String = Base64.getEncoder().encodeToString(rawHmac);
        } catch (UnsupportedEncodingException e) {
            encodeBase64String = e.toString();
        }

        return encodeBase64String;
    }

    /*
	 * https://api.ncloud-docs.com/docs/ko/ai-application-service-sens-smsv2
		{
		    "type":"(SMS | LMS | MMS)",
		    "contentType":"(COMM | AD)",
		    "countryCode":"string",
		    "from":"string",
		    "subject":"string",
		    "content":"string",
		    "messages":[
		        {
		            "to":"string",
		            "subject":"string",
		            "content":"string"
		        }
		    ],
		    "files":[
		        {
		            "name":"string",
		            "body":"string"
		        }
		    ],
		    "reserveTime": "yyyy-MM-dd HH:mm",
		    "reserveTimeZone": "string",
		    "scheduleCode": "string"
		}
	 */
    public void sendSMS(String to, String randNum) { // to에게 randNum을 전송함
        String hostNameUrl = "https://sens.apigw.ntruss.com"; // 호스트 URL
        String requestUrl= "/sms/v2/services/"; // 요청 URL
        String requestUrlType = "/messages"; // 요청 URL
        String method = "POST"; // 요청 method
        String timestamp = Long.toString(System.currentTimeMillis()); // current timestamp (epoch)
        requestUrl += serviceId + requestUrlType;
        String apiUrl = hostNameUrl + requestUrl;

        // JSON 을 활용한 body data 생성
        JSONObject bodyJson = new JSONObject();
        JSONObject toJson = new JSONObject();
        JSONArray toArr = new JSONArray();

        //toJson.put("subject","");							// Optional, messages.subject	개별 메시지 제목, LMS, MMS에서만 사용 가능
        //toJson.put("content","sms test in spring 111");	// Optional, messages.content	개별 메시지 내용, SMS: 최대 80byte, LMS, MMS: 최대 2000byte
        toJson.put("to", to); // Mandatory(필수), messages.to	수신번호, -를 제외한 숫자만 입력 가능
        toArr.add(toJson);
        bodyJson.put("type", "SMS"); // Madantory, 메시지 Type (SMS | LMS | MMS), (소문자 가능)
        bodyJson.put("contentType", "COMM"); // Optional, 메시지 내용 Type (AD | COMM) * AD: 광고용, COMM: 일반용 (default: COMM) * 광고용 메시지 발송 시 불법 스팸 방지를 위한 정보통신망법 (제 50조)가 적용됩니다.
        bodyJson.put("countryCode", "82"); // Optional, 국가 전화번호, (default: 82)
        bodyJson.put("from", "01092458873"); // Mandatory, 발신번호, 사전 등록된 발신번호만 사용 가능
        //bodyJson.put("subject",""); // Optional, 기본 메시지 제목, LMS, MMS에서만 사용 가능
        bodyJson.put("content", "알럿-유 본인 인증 번호입니다. ["+ randNum +"]");	// Mandatory(필수), 기본 메시지 내용, SMS: 최대 80byte, LMS, MMS: 최대 2000byte
        bodyJson.put("messages", toArr); // Mandatory(필수), 아래 항목들 참조 (messages.XXX), 최대 1,000개

        String body = bodyJson.toJSONString(); // String body = bodyJson.toString();

        try {
            URL url = new URL(apiUrl);

            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setUseCaches(false);
            con.setDoOutput(true);
            con.setDoInput(true);
            con.setRequestProperty("content-type", "application/json");
            con.setRequestProperty("x-ncp-apigw-timestamp", timestamp);
            con.setRequestProperty("x-ncp-iam-access-key", accessKey);
            con.setRequestProperty("x-ncp-apigw-signature-v2", makeSignature(requestUrl, timestamp, method, accessKey, secretKey));
            con.setRequestMethod(method);
            con.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());

            wr.write(body.getBytes());
            wr.flush();
            wr.close();

            int responseCode = con.getResponseCode();
            BufferedReader br;
            if(responseCode == 202) { // 정상 호출
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else { // 에러 발생
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }

            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();

        } catch (Exception e) {
            System.out.println(e);
        }
    }

}
