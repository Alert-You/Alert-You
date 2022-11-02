package com.ssafy.alertyou.school.repository;

import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.proof.entity.Proof;
import com.ssafy.alertyou.school.entity.School;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SchoolRepository extends JpaRepository<School,Long> {
    Optional<School> findByNameAndGradeAndClassRoom(String name, int grade, String classRoom);
}
