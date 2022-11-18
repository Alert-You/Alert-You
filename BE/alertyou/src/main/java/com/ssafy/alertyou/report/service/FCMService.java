package com.ssafy.alertyou.report.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;

@Component
@Slf4j
public class FCMService {
    @Value("${fcm.certification}")
    private String credential;

    @PostConstruct
    public void initialize() throws IOException {
        ClassPathResource resource = new ClassPathResource(credential);
        InputStream inputStream = resource.getInputStream();
        FirebaseOptions firebaseOptions = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(inputStream))
                .build();
        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(firebaseOptions);
            System.out.println("FirebaseApp initialization complete");
        }
    }

    public static void sendFCMMessage(String fcmToken, String body) {
//        String fcmToken = "cO92x2HsT0-A0ll01iUeDd:APA91bG77LkusG2eEkXM3Kd9hjrtlnHBdhgP2L394kLaJ8kvBx6qLz7qvltSbw7ixsWy2WXlekAQRpEdN0DeLLg9eTPIDogN7Jvpxn5n1bDdq5dwiIk9oJXT3y5HpE-vuPqYBT4e2NWH"; // 개인
        Message message = Message.builder()
                .putData("title", "알럿-유 알림")
                .putData("body", body)
                .setToken(fcmToken)
                .build();
        FirebaseMessaging.getInstance().sendAsync(message);
    }

}
