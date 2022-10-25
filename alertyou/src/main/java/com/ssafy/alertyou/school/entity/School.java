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
public class School {

    @Id
    @Column(name="school_id")
    private String id;

    @OneToMany(mappedBy = "school")
    private List<School_Info> InfoList = new ArrayList<School_Info>();

    private String name;
    private String region;
    private String address;
    
}
