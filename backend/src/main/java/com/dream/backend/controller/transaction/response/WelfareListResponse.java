package com.dream.backend.controller.transaction.response;

import com.dream.backend.domain.account.Account;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WelfareListResponse {

    private Account account;
    private List<WelfareAndTransactionResponse> list;
}