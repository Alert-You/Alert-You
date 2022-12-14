package com.ssafy.alertyou.alert.repository;

import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.alert.entity.Alert;
import com.ssafy.alertyou.report.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AlertRepository extends JpaRepository<Alert, Long> {

    Optional<Alert> findByUserAndReport(User user, Report report);
    List<Alert> findAllByUserAndChecked(User user, Boolean checked);
    List<Alert> findAllByUser(User user);
    List<Alert> findAllByReport(Report report);

}
