![image](https://user-images.githubusercontent.com/93081720/202328431-be9f29ee-9c3f-4da6-b3c5-cb5c2f8dca5b.png)
# Naver Cloud Application API - Reverse Geocoding

## 도입 목적과 선택 이유

### 도입 목적

사용자에게 정확한 위치 정보(도로명, 우편번호 등)를 제공하기 위해 도입함

### 선택 이유

위도와 경도 정보를 받아서 해당 위치의 정확한 정보를 제공하는 API에는 Google Cloud Platform도 있지만 전면 유료인 반면, Naver Cloud Platform은 월 300만 건까지 무료 제공이기 때문에 선택하였음

## 적용

클라이언트에서 위도와 경도 정보를 제공하면 백엔드에서 해당 정보를 Reverse Geocoding API로 보낸 다음, 응답으로 받아온 JSON 데이터를 가공하여 문자열 형태의 주소 정보로 가공하고 클라이언트로 반환함

### 인증 정보 발급

`Services - AI/NAVER API - Application`에서 `Reverse Geocoding`서비스로 프로젝트를 등록함

![image](https://user-images.githubusercontent.com/93081720/202333122-931a915b-c57e-4980-abd8-554866c173ce.png)

![image](https://user-images.githubusercontent.com/93081720/202334159-a32ba067-2639-4680-99bf-8ab782f3f77b.png)

### 코드

[레퍼런스](https://api.ncloud-docs.com/docs/ai-naver-mapsreversegeocoding-gc)

```java
public static String[] reverseGeo(double longitude, double latitude) { // 경도(longitude): 세로선(x축), 위도(latitude): 가로선(y축)
        try {
            String coords = longitude + "," + latitude;
                        String clientId = "[당신의 클라이언트 Id]";
            String clientSecret = "[당신의 클라이언트 시크릿 키]";
            String basicUrl = String.format("https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?request=coordsToaddr&coords=%s&sourcecrs=epsg:4326&output=json&orders=roadaddr,addr", coords); // orders=legalcode,admcode,roadaddr
            HttpGet getRequest = new HttpGet(basicUrl);
            getRequest.setHeader("X-NCP-APIGW-API-KEY-ID", clientId);
            getRequest.setHeader("X-NCP-APIGW-API-KEY", clientSecret);
            HttpClient client = HttpClientBuilder.create().build();
            HttpResponse response = client.execute(getRequest);

            if (response.getStatusLine().getStatusCode() == 200) {
                ResponseHandler<String> handler = new BasicResponseHandler();
                String body = handler.handleResponse(response);
                ObjectMapper mapper = new ObjectMapper();
                JsonNode bodyJson = mapper.readTree(body);
                String[] locationAddress = new String[3];

                if (bodyJson.get("results").size() == 0) {
                    return null;
                }

                String zipCode = "00000"; // 우편 번호
                if (bodyJson.get("results").path(0).get("land").get("addition1").get("value") != null) {
                    zipCode = "(" + bodyJson.get("results").path(0).get("land").get("addition1").get("value").asText() + ")"; // (우편번호)
                }

                String roadAddress = ""; // 도로명 주소
                String region1 = bodyJson.get("results").path(0).get("region").get("area1").get("name").asText(); // 시
                String region2 = bodyJson.get("results").path(0).get("region").get("area2").get("name").asText(); // 군, 구
                String region3 = bodyJson.get("results").path(0).get("region").get("area3").get("name").asText(); // 동, 읍, 면
                roadAddress += region1 + " " + region2; // OO시 OO구

                String address = region3; // 지번 주소 => 기본은 읍/면/동

                if (bodyJson.get("results").path(1).get("land").get("number1") != null) {
                    String addressNum1 = bodyJson.get("results").path(1).get("land").get("number1").asText(); // 지번(토지 본 번호)
                    if (!addressNum1.equals("")) { // 공백이 아닐 경우에만 더 함
                        address += " " + addressNum1; // OO동 000
                    }
                }

                if (bodyJson.get("results").path(1).get("land").get("number2") != null) {
                    String addressNum2 = bodyJson.get("results").path(1).get("land").get("number2").asText(); // 지번(토지 부 번호)
                    if (!addressNum2.equals("")) { // 공백이 아닐 경우에만 더 함
                        address += "-" + addressNum2; // OO동 000-00
                    }
                }

                if (bodyJson.get("results").path(0).get("land").get("name") != null) {
                    String road = bodyJson.get("results").path(0).get("land").get("name").asText(); // 도로명;
                    roadAddress += " " + road;  // OO시 OO구 OO로
                }

                if (bodyJson.get("results").path(0).get("land").get("number1") != null) {
                    String buildingNo1 = bodyJson.get("results").path(0).get("land").get("number1").asText(); // 건물 번호1;
                    if (!buildingNo1.equals("")) { // 공백이 아닐 경우에만 더 함
                        roadAddress += " " + buildingNo1; // OO시 OO구 OO로 00
                    }
                }

                if (bodyJson.get("results").path(0).get("land").get("number2") != null) {
                    String buildingNo2 = bodyJson.get("results").path(0).get("land").get("number2").asText(); // 건물 번호2;
                    if (!buildingNo2.equals("")) { // 공백이 아닐 경우에만 더 함
                        roadAddress += "-" + buildingNo2; // OO시 OO구 OO로 00-00
                    }
                }

                if (bodyJson.get("results").path(0).get("land").get("addition0").get("value") != null) {
                    String land = bodyJson.get("results").path(0).get("land").get("addition0").get("value").asText(); // 건물명
                    if (!land.equals("")) { // 공백이 아닐 경우에만 더 함
                        roadAddress += " " + land;  // (우편번호) OO시 OO구 OO로 00-00 OO빌딩
                    }
                }

                locationAddress[0] = zipCode;
                locationAddress[1] = roadAddress;
                locationAddress[2] = address;
                return locationAddress;
            } else {
                return null;
            }

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
```