package com.ssafy.alertyou.bodyguard.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.bodyguard.entity.Coguard;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

import static com.ssafy.alertyou.bodyguard.entity.QCoguard.coguard;

@Component
@RequiredArgsConstructor
public class CoGuardQueryDslRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public List<Coguard> findAllByUser(User user) {
        return jpaQueryFactory.select(coguard)
                .from(coguard)
                .where(coguard.user.id.eq(user.getId()))
                .fetch();
    };

    public Optional<Coguard> findByCoGuardAndUser(User userCoGuard, User user) {
        Coguard coguard1 = jpaQueryFactory.select(coguard)
                .from(coguard)
                .where(coguard.coGuard.id.eq(userCoGuard.getId()),
                        coguard.user.id.eq(user.getId()))
                .fetchOne();
        return Optional.ofNullable(coguard1);
    };

    public List<Coguard> findAllByCoGuard(User userCoGuard) {
        return jpaQueryFactory.select(coguard)
                .from(coguard)
                .where(coguard.coGuard.id.eq(userCoGuard.getId()))
                .fetch();
    };

}
