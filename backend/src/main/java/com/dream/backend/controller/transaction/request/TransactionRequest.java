package com.dream.backend.controller.transaction.request;

import com.dream.backend.domain.transaction.Transaction;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionRequest {

    private int tran_amt;
    private Long account_number;
    private String tran_desc;
    private int inout_type;

}
