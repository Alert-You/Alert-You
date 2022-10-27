package com.ssafy.alertyou.account.repository;

import com.ssafy.alertyou.account.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByPhone(String phone);
//    List<User> findBySchool(String school);
}
