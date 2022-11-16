package com.ssafy.alertyou.account.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.school.entity.School;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

import static com.ssafy.alertyou.account.entity.QUser.user;

@Component
@RequiredArgsConstructor
public class UserQueryDslRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public User findByPhone(String phone) {
        return jpaQueryFactory.select(user)
                .where(user.phone.eq(phone))
                .from(user)
                .fetchOne();
    }

    public List<User> findAllBySchoolAndRoleOrderByUsernameAsc(School school, String role) {
        return jpaQueryFactory.select(user)
                .where(user.school.id.eq(school.getId()),
                        user.role.eq(role))
                .orderBy(user.username.asc())
                .from(user)
                .fetch();
    }

    public User findBySchoolAndRole(School school, String role) {
        return jpaQueryFactory.select(user)
                .where(user.school.id.eq(school.getId()),
                        user.role.eq(role))
                .from(user)
                .fetchOne();
    }

}
