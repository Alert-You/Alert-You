package com.ssafy.alertyou.account.repository;

import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.school.entity.School;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByPhone(String phone);
//    List<User> findBySchool(String school);

    // list 반환이기 때문에 findAll 메서드 사용
    // 학생들만 찾아야하기 때문에 AndRole 추가
    List<User> findAllBySchoolAndRoleOrderByUsernameAsc(School school,String role);
    User findBySchoolAndRole(School school, String role);

}
