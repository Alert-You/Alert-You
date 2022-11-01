package com.ssafy.alertyou.report.repository;

import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.report.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {

    public List<Report> findAllByReUser(User user);

}
