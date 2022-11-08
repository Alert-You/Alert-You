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
    public static String reverseGeo(double longitude, double latitude) { // 경도(longitude): 세로선(x축), 위도(latitude): 가로선(y축)
        try {
            String clientId = "co4w5k4lo3"; // 클라이언트 ID
            String clientSecret = "vLrvWalrYx895ya4jmC3XGmWqf3E11ViQJnhppLV"; // 클라이언트 키
            String coords = longitude + "," + latitude;
            // orders 옵션: legalcode: 좌표 to 법정동, admcode: 좌표 to 행정동, addr: 좌표 to 지번 주소, roadaddr: 좌표 to 도로명 주소(새주소)
            // sourcecrs 옵션: 좌표 체계(EPSG:4326)
            // coords 옵션: 입력좌표("경도값,위도값")
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
                String address = "";

                if (bodyJson.get("results").path(0).get("land").get("addition1").get("value") != null) {
                    String zipCode = bodyJson.get("results").path(0).get("land").get("addition1").get("value").asText(); // 우편번호
                    address += "(" + zipCode + ")"; // (우편번호)
                }

                String region1 = bodyJson.get("results").path(0).get("region").get("area1").get("name").asText(); // 시
                String region2 = bodyJson.get("results").path(0).get("region").get("area2").get("name").asText(); // 군, 구
                String region3 = bodyJson.get("results").path(0).get("region").get("area3").get("name").asText(); // 동, 읍, 면
                address += " " + region1 + " " + region2 + " " + region3; // (우편번호) OO시 OO구 OO동

                if (bodyJson.get("results").path(1).get("land").get("number1") != null) {
                    String addressNum1 = bodyJson.get("results").path(1).get("land").get("number1").asText(); // 지번(토지 본 번호)
                    address += " " + addressNum1; // (우편번호) OO시 OO구 OO동 000
                }

                if (bodyJson.get("results").path(1).get("land").get("number2") != null) {
                    String addressNum2 = bodyJson.get("results").path(1).get("land").get("number2").asText(); // 지번(토지 부 번호)
                    if (!addressNum2.equals("")) { // 공백이 아닐 경우에만 더 함
                        address += " " + addressNum2; // (우편번호) OO시 OO구 OO동 000-00
                    }
                }

                if (bodyJson.get("results").path(0).get("land").get("name") != null) {
                    String road = bodyJson.get("results").path(0).get("land").get("name").asText(); // 도로명;
                    address += " " + road;  // (우편번호) OO시 OO구 OO동 OO로
                }

                if (bodyJson.get("results").path(0).get("land").get("addition0").get("value") != null) {
                    String land = bodyJson.get("results").path(0).get("land").get("addition0").get("value").asText(); // 건물
                    if (!land.equals("")) { // 공백이 아닐 경우에만 더 함
                        address += " " + land;  // (우편번호) OO시 OO구 OO동 OO로 OO빌딩
                    }
                }

                return address; // return bodyJson;

            } else {
                return null;
            }

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


}
