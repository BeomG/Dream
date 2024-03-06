package com.dream.backend.elasitc.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class WelfareInfoRequestDto {

    private Long welfareId;
    private String name;
    private String description;
}
