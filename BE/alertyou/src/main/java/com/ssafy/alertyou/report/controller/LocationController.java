package com.ssafy.alertyou.report.controller;

import com.ssafy.alertyou.common.BaseResponseBody;
import com.ssafy.alertyou.report.dto.LocationResDto;
import com.ssafy.alertyou.report.service.LocationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "위치 정보 조회 API", tags = {"location"})
@RestController
@RequestMapping("/api/location")
@RequiredArgsConstructor
public class LocationController {

    private final LocationService locationService;

    @GetMapping("/{longitude}/{latitude}")
    @ApiOperation(value = "위치 정보 조회", notes = "경도와 위도를 입력하여 위치 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "위치 정보 조회 성공"),
            @ApiResponse(code = 404, message = "위치를 찾을 수 없음")
    })
    public ResponseEntity<? extends BaseResponseBody> location(@PathVariable("longitude") double longitude, @PathVariable("latitude") double latitude) {
        String[] locationAddress = locationService.reverseGeo(longitude, latitude);
        if (locationAddress == null) {
            return ResponseEntity.status(404).body(BaseResponseBody.result(404, "위치 정보를 찾을 수 없습니다."));
        }
        String zipCode = locationAddress[0];
        String roadAddress = locationAddress[1];
        String address = locationAddress[2];
        return ResponseEntity.status(200).body(LocationResDto.result(200, "위치 정보 조회 성공", zipCode, zipCode + " " + roadAddress, address));
    }

}