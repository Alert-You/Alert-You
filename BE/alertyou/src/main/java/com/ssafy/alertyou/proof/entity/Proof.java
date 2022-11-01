package com.ssafy.alertyou.proof.entity;

import com.ssafy.alertyou.account.entity.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "proof")
public class Proof {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "user_id")
    private User user;

    @Column
    private Boolean ctype;

    @Column
    private String url;

    @Column
    private String endPoint;

    @Column
    private String createdAt;

}
