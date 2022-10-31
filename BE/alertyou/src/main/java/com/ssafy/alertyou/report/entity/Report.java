package com.ssafy.alertyou.report.entity;

import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.school.entity.School;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.joda.time.DateTime;
import org.joda.time.LocalDateTime;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Report {

    @Id
    @Column(name="report_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "report_user_id")
    private User reUser;

    private boolean isVictim;
    private LocalDateTime dateTime;
    private boolean checked;
    private String content;
    private int latitude;
    private int longtitude;
}
