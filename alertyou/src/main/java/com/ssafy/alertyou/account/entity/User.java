package com.ssafy.alertyou.account.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

//    @OneToMany(mappedBy = "user")
//    private List<Bodygaurd> bodygaurdList = new ArrayList<>();

//    @OneToOne
//    @JoinColumn(name = "school_id")
//    private School school;

    private String password;
    private String role;
    private String username;
    private String phone;
    private String social;
    private boolean active;
    
}
