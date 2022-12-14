package com.ssafy.alertyou.bodyguard.repository;

import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.bodyguard.entity.Coguard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CoGuardRepository extends JpaRepository<Coguard, Long> {
    public List<Coguard> findAllByUser(User user);
    public Optional<Coguard> findByCoGuardAndUser(User coGuard, User user);
//    public Optional<Coguard> fndByCoGuard(User user);
    public List<Coguard> findAllByCoGuard(User user);
}
