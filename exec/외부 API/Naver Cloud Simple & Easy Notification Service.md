![image](https://user-images.githubusercontent.com/93081720/202328431-be9f29ee-9c3f-4da6-b3c5-cb5c2f8dca5b.png)
# Naver Cloud Simple & Easy Notification Service

## 도입 목적과 선택 이유

### 도입 목적

회원가입 시 휴대전화 본인 인증을 위한 인증 번호 발송 목적으로 도입함

### 선택 이유

SMS Notification API로 유명한 COOL SMS도 있으나, Naver Cloud Platform을 선택한 이유는 
전자는 SMS 무료 15건 + 건당 20원이나, 후자는 월 50건 무료 + 건당 9원(사용량에 따라 서비스 이용 요금 변동)이기 때문에 더 저렴하고 서비스 지원이 좋은 Naver Cloud Platform을 선택하였음

## 적용

백엔드 서버에서 6자리 숫자를 랜덤으로 생성하여 조합한 뒤, 해당 내용을 Naver Cloud SMS & Notification을 사용하여 회원가입을 시도하는 사용자의 휴대전화로 전송하는 로직을 구현하였음

### 키 발급

해당 서비스를 이용하기 위해서는 Naver Cloud Platform에 가입한 다음, 결제를 위한 결제 수단을 등록해야함

등록 후 `마이 페이지 - 인증키 관리 - API 인증키 관리`에서

`Access Key ID`와 `Secret Key`를 사용 예정

![image](https://user-images.githubusercontent.com/93081720/202330281-055dcc62-41e9-42ca-9cc4-c4d9b328a1d1.png)

### 서비스 등록 및 서비스 아이디 발급

`Services - Application Services`의 `Simple & Easy Notification Service`를 선택

다음과 같이 Naver Cloud Simple & Easy Notification Service에 프로젝트를 등록한 다음 서비스 ID를 발급받는다

![image](https://user-images.githubusercontent.com/93081720/202330948-1bedefcd-1db5-4ba5-aad2-a1b22574b960.png)

### 적용

다음과 같이 백엔드 코드에 적용하여 사용함

#### 암호 사인 키 만들기

```java
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
```

#### 메세지 전송

```java
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

        toJson.put("to", to); // Mandatory(필수), messages.to	수신번호, -를 제외한 숫자만 입력 가능
        toArr.add(toJson);
        bodyJson.put("type", "SMS"); // Madantory, 메시지 Type (SMS | LMS | MMS), (소문자 가능)
        bodyJson.put("contentType", "COMM"); // Optional, 메시지 내용 Type (AD | COMM) * AD: 광고용, COMM: 일반용 (default: COMM) * 광고용 메시지 발송 시 불법 스팸 방지를 위한 정보통신망법 (제 50조)가 적용됩니다.
        bodyJson.put("countryCode", "82"); // Optional, 국가 전화번호, (default: 82)
        bodyJson.put("from", "01092458873"); // Mandatory, 발신번호, 사전 등록된 발신번호만 사용 가능
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
```