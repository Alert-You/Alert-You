package com.ssafy.alertyou.report.service;
import com.google.firebase.FirebaseApp;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
@RequiredArgsConstructor
public class FCMessageService {

    // FCM에서 가입 후 받는 키값
    @Value("${fcm.certification}")
    private static String AUTH_KEY_FCM;

//    public final static String API_URL_FCM = "https://fcm.googleapis.com/fcm/send";
    public final static String API_URL_FCM = "https://fcm.googleapis.com/v1/projects/alertyou-7129b/messages:send";

    public void sendMessage() throws Exception{

        //String token = tokenList.get(count).getDEVICE_ID();

        String _title = "앱 알림";
        String _body = "푸쉬메시지가 도착했습니다.";
        String _actionType = "new";
        String _code = "test";
        //String _token = "/topics/ALL"; // 전체

        // 모바일기기에서 얻음
        String _token = "cO92x2HsT0-A0ll01iUeDd:APA91bG77LkusG2eEkXM3Kd9hjrtlnHBdhgP2L394kLaJ8kvBx6qLz7qvltSbw7ixsWy2WXlekAQRpEdN0DeLLg9eTPIDogN7Jvpxn5n1bDdq5dwiIk9oJXT3y5HpE-vuPqYBT4e2NWH"; // 개인


        final String apiKey = AUTH_KEY_FCM;
        URL url = new URL(API_URL_FCM);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setDoOutput(true);
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("Authorization", "key=" + apiKey);

        conn.setDoOutput(true);


        JSONObject json = new JSONObject();
        JSONObject notification = new JSONObject();
        notification.put("title", _title);
        notification.put("body", _body);

        json.put("notification", notification);
        json.put("to", _token);

        String sendMsg = json.toString();

        OutputStream os = conn.getOutputStream();

        // 서버에서 날려서 한글 깨지는 사람은 아래처럼  UTF-8로 인코딩해서 날려주자
        //os.write(input.getBytes("UTF-8"));
        os.write(sendMsg.getBytes("UTF-8"));
        os.flush();
        os.close();

        int responseCode = conn.getResponseCode();
        System.out.println("\nSending 'POST' request to URL : " + url);
        System.out.println("Response Code : " + responseCode);

        BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();
        // print result
        System.out.println(response.toString());
    }
}