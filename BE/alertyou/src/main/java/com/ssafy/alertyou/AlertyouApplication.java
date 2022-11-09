package com.ssafy.alertyou;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
public class AlertyouApplication {
	@PostConstruct
	public void started() {
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
	}
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
	public static void main(String[] args) {
		SpringApplication.run(AlertyouApplication.class, args);
	}

}
