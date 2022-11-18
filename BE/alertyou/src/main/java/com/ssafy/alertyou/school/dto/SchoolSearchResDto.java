package com.ssafy.alertyou.school.dto;

import com.ssafy.alertyou.school.entity.School;
import lombok.Getter;

@Getter
public class SchoolSearchResDto implements Comparable<SchoolSearchResDto>{
    private String address;
    private String name;

    public SchoolSearchResDto(School school) {
        this.address = school.getAddress();
        this.name = school.getName();
    }

    //배열 객체를 set 하기 위한 함수
    // set은 기본적으로 값이 같아도 객체는 다르게 받아들이기 때문에, 객체의 중복을 피할 수 없음
    // 따라서 주소 + 이름으로 hashcode를 만들고, 같은지 비교하는 함수 작성 : override
    @Override
    public int hashCode() {
        return (this.address+this.name).hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        //p1.equals(p2)
        if(obj instanceof SchoolSearchResDto) {
            SchoolSearchResDto p = (SchoolSearchResDto)obj;
            return this.hashCode()==p.hashCode();

        }
        return false;
    }

    //지역 정렬
    @Override
    public int compareTo(SchoolSearchResDto schoolSearchResDto) {
        return this.address.compareTo(schoolSearchResDto.address);
    }
}
