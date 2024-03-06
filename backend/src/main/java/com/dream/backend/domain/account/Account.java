package com.dream.backend.domain.account;

import com.dream.backend.domain.bank.Bank;
import com.dream.backend.domain.bank_client.BankClient;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="account_number")
    private Long id;

    @ManyToOne
    @JoinColumn(name="bank_code")
    private Bank bank;

    @ManyToOne
    @JoinColumn(name = "client_key")
    private BankClient client;

    @Column(name = "branch_name", length = 50)
    private String branch_name;

    @Column(name = "balance")
    private int balance;

    public String getBranch_name() { return this.branch_name; }

    // - - - 비지니스 로직 - - -

    public void changeBalance(int after_amt) {
        this.balance = after_amt;
    }
}
