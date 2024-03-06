package com.dream.backend.domain.qualification;

import com.dream.backend.domain.region.Region;
import com.dream.backend.domain.welfare.Welfare;
import lombok.Getter;

import javax.persistence.*;
import java.io.Serializable;


@Entity
@Getter
//@Embeddable
//extend serializable 생략
public class Qualification {
    @Id
    @Column(name = "welfare_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "region_key")
    private Region region;

    @Column
    private int age;

//    @Column
//    private int end_year;

}
