package com.dream.backend.controller.user.response;

import lombok.Builder;
import lombok.Data;

@Data
public class UserFundResponse {
    private int pre_fund;
    private int total_fund;
    private boolean my_data;

    @Builder
    private UserFundResponse(int pre_fund, int total_fund, boolean my_data) {
        this.pre_fund = pre_fund;
        this.total_fund = total_fund;
        this.my_data = my_data;
    }

}
