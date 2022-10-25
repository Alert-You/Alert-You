package com.ssafy.alertyou.school.entity;

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
public class School_Info {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="info_id")
    private long id;

    @ManyToOne
    @JoinColumn(name = "school_id")
    private School school;

    private String grade;
    private String room;


    
}
