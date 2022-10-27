package com.ssafy.alertyou.proof.repository;

import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.proof.entity.Proof;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProofRepository extends JpaRepository<Proof,Long> {
    List<Proof> findAllByUserOrderByCreatedAtDesc(User user);
}
