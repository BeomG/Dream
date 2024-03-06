package com.dream.backend.domain.welfare;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Welfare {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="welfare_id")
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 100)
    private String organization;

    @Column
    private LocalDateTime start_date;

    @Column
    private LocalDateTime end_date;

    @Column
    private String route;

    @Column
    private String submission;

    @Column
    private int support_fund;

    @Column
    private String description_origin;

    @Column
    private String description;

    @Column
    private String url;

    @Column
    private String img;

    @Column
    private int support_period;

    @Column
    private String etc;

    @Column(name = "welfare_code")
    private String welfareCode;


    @Column(length = 225)
    private String welfare_type;

}
