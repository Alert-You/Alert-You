package com.ssafy.alertyou.school.repository;

import com.ssafy.alertyou.school.entity.School;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SchoolRepository extends JpaRepository<School,Long> {
    Optional<School> findByAddressAndGradeAndClassRoom(String address, int grade, String classRoom);
    List<School> findAllByNameAndGrade(String name, int grade);

    List<School> findAllByNameContainsOrderByAddress(String word);

    List<School> findAllByNameAndAddress(String name,String address);
}
