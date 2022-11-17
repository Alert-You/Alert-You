package com.ssafy.alertyou.proof.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.proof.entity.Proof;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

import static com.ssafy.alertyou.proof.entity.QProof.proof;

@Component
@RequiredArgsConstructor
public class ProofQueryDslRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public List<Proof> findAllByUserOrderByCreatedAtDesc(User user) {
        return jpaQueryFactory.select(proof)
                .from(proof)
                .where(proof.user.id.eq(user.getId()))
                .orderBy(proof.createdAt.desc())
                .fetch();
    };

}
