package com.ssafy.alertyou.bodyguard.repository;

import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.bodyguard.entity.Coguard;
import com.ssafy.alertyou.bodyguard.entity.Opguard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CoGuardRepository extends JpaRepository<Coguard, Long> {
    public List<Coguard> findAllByUser(User user);
}
