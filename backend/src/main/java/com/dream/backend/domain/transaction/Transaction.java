package com.dream.backend.domain.transaction;

import com.dream.backend.controller.transaction.request.TransactionRequest;
import com.dream.backend.domain.account.Account;
import com.dream.backend.domain.inout_type.InoutType;
import com.dream.backend.domain.transaction_category.TransactionCategory;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_number")
    private Account account;

    //account 테이블의 fk를 조인하고 싶을 때!

    @Column(name = "bank_code")
    private String bank;

    @Column(name = "client_key")
    private Long client;

    @Column(name = "tran_date")
    private LocalDateTime tranDate;

    @OneToOne
    @JoinColumn(name = "category_key")
    private TransactionCategory tranType;

    @OneToOne
    @JoinColumn(name = "inout_key")
    private InoutType inoutType;

    @Column(name = "tran_desc", length = 50)
    private String tranDesc;

    @Column(name = "tran_amt")
    private int tranAmt;

    @Column(name = "after_balanced_amt")
    private int balance;

    @Builder
    public Transaction(long id, Account account, LocalDateTime tranDate, TransactionCategory tranType, InoutType inoutType, String tranDesc, int tranAmt, int balance) {
        this.id = id;
        this.account = account;
        this.bank = account.getBank().getBankCode();
        this.client = account.getClient().getClientCode();
        this.tranDate = tranDate;
        this.tranType = tranType;
        this.inoutType = inoutType;
        this.tranDesc = tranDesc;
        this.tranAmt = tranAmt;
        this.balance = balance;
    }

    public LocalDateTime getTranDate() {
        return tranDate;
    }

    // ----- 비지니스 로직 ------ //

    public static Transaction toEntity(TransactionRequest request, Account account, int after_amt, InoutType type) {
        return  Transaction.builder()
                .account(account)
                .tranAmt(request.getTran_amt())
                .tranDesc(request.getTran_desc())
                .inoutType(type)
                .tranDate(LocalDateTime.now())
                .balance(after_amt)
                .build();
    }
}