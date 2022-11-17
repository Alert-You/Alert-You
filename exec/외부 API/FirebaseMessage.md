![image](https://user-images.githubusercontent.com/93081720/202335094-8d7c790d-c7a7-45ac-a417-0fe5d488ccfc.png)

# FirebaseMessage

## 도입 목적과 선택 이유

### 도입 목적

신고 알림을 보냈을 때, 모바일 어플리케이션 푸시 알림 기능을 활용하기 위한 목적으로 도입함

### 선택 이유

상동

## 적용

### 작동 원리

클라이언트에서 FCM 토큰을 보내면 백엔드의 유저 테이블에는 유저별로 FCM 토큰을 저장한다.

해당 토큰은 각 유저별 고유 토큰으로, 본 문서에서는 토큰에 대한 관리 방안은 서술하지 않는다. 하지만 해당 토큰 역시 관리가 필요한 부분임은 반드시 인지하길 바란다.

클라이언트에서 알림 버튼을 눌러 알림을 보내면 해당 유저와 관계가 맵핑되어 있는 다른 유저의 FCM 토큰 목록을 받아와서 해당 FCM 토큰에게 푸시 알림을 보내는 구조이다.

### 프로젝트 등록 및 json파일 발급

Firebase에 프로젝트를 등록하고 프로젝트의 json파일을 다운로드한 다음, 백엔드 서버 디렉토리에 저장한다.

### 코드

저장한 json 파일을 credential로 사용하고, Firebase App을 스프링 컴포넌트로 등록하여 스프링부트 프로젝트 실행 시 초기화하여 같이 실행되게 끔 구성한다.

```java
@Component
@Slf4j
public class FCMService {
    @Value("${fcm.certification}") // json 파일
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

    public static void sendFCMMessage(String fcmToken) {
        Message message = Message.builder()
                .putData("title", "알럿-유 알림")
                .putData("body", "[긴급] 학교 폭력 신고 알림")
                .setToken(fcmToken)
                .build();
        FirebaseMessaging.getInstance().sendAsync(message);
    }
}
```