package com.ssafy.alertyou.report.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.stereotype.Service;

@Service
public class LocationService {

    // 역지오 서비스
    public static String[] reverseGeo(double longitude, double latitude) { // 경도(longitude): 세로선(x축), 위도(latitude): 가로선(y축)
        try {
            String coords = longitude + "," + latitude;
            // orders 옵션: legalcode: 좌표 to 법정동, admcode: 좌표 to 행정동, addr: 좌표 to 지번 주소, roadaddr: 좌표 to 도로명 주소(새주소)
            // sourcecrs 옵션: 좌표 체계(EPSG:4326)
            // coords 옵션: 입력좌표("경도값,위도값")
            String clientId = "당신의 클라이언트 ID";
            String clientSecret = "당신의 클라이언트 시크릿 키";
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
                return locationAddress; // return bodyJson;

            } else {
                return null;
            }

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


}
