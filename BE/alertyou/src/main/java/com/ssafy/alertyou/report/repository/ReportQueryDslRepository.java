package com.ssafy.alertyou.report.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.report.entity.Report;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

import static com.ssafy.alertyou.report.entity.QReport.report;

@Component
@RequiredArgsConstructor
public class ReportQueryDslRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public List<Report> findAllByReUser(User user) {
        return jpaQueryFactory.select(report)
                .from(report)
                .where(report.reUser.id.eq(user.getId()))
                .fetch();
    }
}
