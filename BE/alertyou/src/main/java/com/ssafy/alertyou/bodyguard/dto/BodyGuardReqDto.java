package com.ssafy.alertyou.bodyguard.dto;

import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.bodyguard.entity.Coguard;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@ApiModel("BodyGuardRequestDTO")
public class BodyGuardReqDto {

    @ApiModelProperty(name="등록한 사람 id")
    private long enrollId;

    @ApiModelProperty(name="등록한 보디가드 id")
    private long guardId;

}
