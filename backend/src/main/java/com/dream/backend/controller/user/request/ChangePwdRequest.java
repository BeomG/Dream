package com.dream.backend.controller.user.request;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChangePwdRequest {
    @NotNull
    private String pwd;
}
