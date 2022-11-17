package com.ssafy.alertyou.bodyguard.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.bodyguard.entity.Opguard;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

import static com.ssafy.alertyou.bodyguard.entity.QOpguard.opguard;

@Component
@RequiredArgsConstructor
public class OpGuardQueryDslRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public List<Opguard> findAllByUser(User user) {
        return jpaQueryFactory.select(opguard)
                .from(opguard)
                .where(opguard.user.id.eq(user.getId()))
                .fetch();
    };

    public Optional<Opguard> findByOpGuardAndUser(User userOpGuard, User user) {
        Opguard opguard1 = jpaQueryFactory.select(opguard)
                .from(opguard)
                .where(opguard.opGuard.id.eq(userOpGuard.getId()),
                        opguard.user.id.eq(user.getId()))
                .fetchOne();
        return Optional.ofNullable(opguard1);
    };

    public List<Opguard> findAllByOpGuard(User userOpGuard) {
        return jpaQueryFactory.select(opguard)
                .from(opguard)
                .where(opguard.opGuard.id.eq(userOpGuard.getId()))
                .fetch();
    };


}
