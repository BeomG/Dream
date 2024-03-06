package com.dream.backend.controller.user.request;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserLoginRequest {
    @NotNull
    private String email;
    @NotNull
    private String password;

    @Builder
    private UserLoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }
}