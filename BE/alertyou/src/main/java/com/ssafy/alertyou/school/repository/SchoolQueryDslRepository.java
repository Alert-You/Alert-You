package com.ssafy.alertyou.school.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.alertyou.school.entity.School;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

import static com.ssafy.alertyou.school.entity.QSchool.school;

@Component
@RequiredArgsConstructor
public class SchoolQueryDslRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Optional<School> findByAddressAndGradeAndClassRoom(String address, int grade, String classRoom) {
        School school1 = jpaQueryFactory.select(school)
                .from(school)
                .where(school.address.eq(address),
                        school.grade.eq(grade),
                        school.classRoom.eq(classRoom))
                .fetchOne();
        return Optional.ofNullable(school1);
    };

    public List<School> findAllByNameAndGrade(String name, int grade) {
        return jpaQueryFactory.select(school)
                .from(school)
                .where(school.name.eq(name),
                        school.grade.eq(grade))
                .fetch();
    };

    public List<School> findAllByNameContainsOrderByAddress(String word) {
        return jpaQueryFactory.select(school)
                .from(school)
                .where(school.name.contains(word))
                .fetch();
    };

    public List<School> findAllByNameAndAddress(String name, String address) {
        return jpaQueryFactory.select(school)
                .from(school)
                .where(school.name.contains(name),
                        school.address.contains(address))
                .fetch();
    };

}
