package com.dream.backend.domain.transaction_category;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TransactionCategory {

    @Id
    @Column(name = "category_key")
    private int id;

    @Column(name = "category_name")
    private String name;

    public TransactionCategory(int id, String name) {
        this.id = id;
        this.name = name;
    }
}
