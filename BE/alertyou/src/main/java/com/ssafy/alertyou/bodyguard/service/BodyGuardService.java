package com.ssafy.alertyou.bodyguard.service;

import com.ssafy.alertyou.bodyguard.dto.BodyGuardResDto;

import java.util.List;

public interface BodyGuardService {
    public List<BodyGuardResDto> getBodyGuard(long id) throws Exception;
    public Long addBodyGuard(String token, long id) throws Exception;
}
