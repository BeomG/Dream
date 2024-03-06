package com.dream.backend.domain.inout_type;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class InoutType {

    @Id
    @Column(name = "inout_key")
    private int id;

    @Column(name = "inout_desc")
    private String desc;
}
