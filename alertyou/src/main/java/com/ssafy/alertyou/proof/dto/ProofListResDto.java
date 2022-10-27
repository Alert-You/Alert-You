package com.ssafy.alertyou.proof.dto;

import com.ssafy.alertyou.proof.entity.Proof;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ProofListResDto {
    private Long proof_id;
    private String url;
    private Boolean type;
    private LocalDateTime created_time;

    public ProofListResDto(Proof entity){
        this.proof_id = entity.getId();
        this.url = entity.getUrl();
        this.type = entity.getCtype();
        this.created_time = entity.getCreatedAt();
    }
}
