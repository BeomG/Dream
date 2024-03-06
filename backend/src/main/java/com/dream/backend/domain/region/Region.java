package com.dream.backend.domain.region;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Region {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="region_key")
    private long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int level;

    @Column(nullable = true)
    private int parent_key;
    // - - - 비즈니스 로직 - - - -
    public Region findRegion(){
         Region region = findRegion();
         return region;
    }

}
