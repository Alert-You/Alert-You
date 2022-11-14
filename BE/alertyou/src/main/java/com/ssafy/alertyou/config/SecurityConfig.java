package com.ssafy.alertyou.config;

import com.ssafy.alertyou.account.jwt.JwtAuthenticationFilter;
import com.ssafy.alertyou.account.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserService userService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .httpBasic().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .cors()
                .and()
                .addFilter(new JwtAuthenticationFilter(authenticationManager(), userService))
                .authorizeRequests()
                .antMatchers("/api/auth/signout", "/api/auth/profile", "/api/auth/update", "/api/auth/logout")
                .authenticated()
                .antMatchers("/api/bodyguard/**", "/api/location/**", "/api/report/**", "/api/alert/**", "/api/proof/**")
                .authenticated()
                .antMatchers("/api/teacher/**")
                .hasAuthority("교사")
                .anyRequest().permitAll();
    }

}
