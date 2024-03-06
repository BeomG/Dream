package com.dream.backend.controller.transaction.response;

import com.dream.backend.domain.inout_type.InoutType;
import com.dream.backend.domain.transaction_category.TransactionCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionObject {

    private LocalDateTime dateTime;
    private InoutType type;
    private TransactionCategory category;
    private String tranDesc;
    private int tranAmt;
    private int afterAmt;

}
