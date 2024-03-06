package com.dream.backend.controller.user.response;

import lombok.Builder;
import lombok.Data;

@Data
public class UserLoginResponse {
    private Long id;
    private boolean myData;

    @Builder
    private UserLoginResponse(Long id, boolean myData) {
        this.id = id;
        this.myData = myData;
    }
}
