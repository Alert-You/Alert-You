package com.ssafy.alertyou.alert.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.alert.entity.Alert;
import com.ssafy.alertyou.report.entity.Report;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

import static com.ssafy.alertyou.alert.entity.QAlert.alert;

@Component
@RequiredArgsConstructor
public class AlertQueryDslRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Optional<Alert> findByUserAndReport(User user, Report report) {
        Alert alert1 = jpaQueryFactory.select(alert)
                .from(alert)
                .where(alert.user.id.eq(user.getId()),
                        alert.report.id.eq(report.getId()))
                .fetchOne();
        return Optional.ofNullable(alert1);
    };

    public List<Alert> findAllByUserAndChecked(User user, Boolean checked) {
        return jpaQueryFactory.select(alert)
                .from(alert)
                .where(alert.user.id.eq(user.getId()),
                        alert.checked.eq(checked))
                .fetch();
    };

    public List<Alert> findAllByUser(User user) {
        return jpaQueryFactory.select(alert)
                .from(alert)
                .where(alert.user.id.eq(user.getId()))
                .fetch();
    };

    public List<Alert> findAllByReport(Report report) {
        return jpaQueryFactory.select(alert)
                .from(alert)
                .where(alert.report.id.eq(report.getId()))
                .fetch();
    };

}
