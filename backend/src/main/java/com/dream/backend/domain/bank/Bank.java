package com.dream.backend.domain.bank;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Bank {
    @Id
    @Column(name="bank_code", length = 50)
    private String bankCode;

    @Column(name="bank_name", nullable = false, length = 50)
    private String bankName;

    public String getBankName() {
        return this.bankName;
    }
}
