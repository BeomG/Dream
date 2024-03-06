package com.dream.backend.controller.transaction.response;

import com.dream.backend.domain.inout_type.InoutType;
import com.dream.backend.domain.transaction_category.TransactionCategory;
import com.dream.backend.domain.welfare.repository.WelfareRepository;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WelfareAndTransactionResponse {

    private LocalDateTime dateTime;
    private InoutType type;
    private TransactionCategory category;
    private WelfareRepository.WelfareNativeVo welfare;
    private String tranDesc;
    private int tranAmt;
    private int afterAmt;
}