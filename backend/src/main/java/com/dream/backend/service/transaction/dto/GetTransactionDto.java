package com.dream.backend.service.transaction.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

//@RequiredArgsConstructor
@NoArgsConstructor
@Data
public class GetTransactionDto {
    private int transactionId;
    private int accountNumber;
    private LocalDateTime tranTime;
    private int afterBalance; // 계좌의 현재 잔액이 아닌 당시 거래 직후 잔액인 점에 주의
    private String clientName;
    private int tranAmt;      // 거래 금액(입금 혹은 출금)
    private int inoutType;    // 거래 형태
    private String tranDesc;


}
