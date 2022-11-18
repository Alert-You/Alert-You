package com.ssafy.alertyou.proof.dto;

import com.ssafy.alertyou.proof.entity.Proof;
import lombok.Getter;


@Getter
public class ProofListResDto {
    private Long proofId;
    private String url;
    private Boolean type;
    private String createDate;

    public ProofListResDto(Proof entity){
        this.proofId = entity.getId();
        this.url = entity.getUrl();
        this.type = entity.getCtype();
        this.createDate = entity.getCreatedAt();
    }
}
