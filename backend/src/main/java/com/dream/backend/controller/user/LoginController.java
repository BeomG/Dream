package com.dream.backend.controller.user;

import com.dream.backend.controller.ApiResponse;
import com.dream.backend.controller.user.request.UserLoginRequest;
import com.dream.backend.controller.user.response.UserLoginResponse;
import com.dream.backend.service.user.LoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/login")
    public ApiResponse<UserLoginResponse> login(@RequestBody UserLoginRequest request){
        String user_email = request.getEmail();
        String user_password = request.getPassword();
        UserLoginResponse response = loginService.loginUser(user_email,user_password);
        return ApiResponse.ok(response);
    }

    @PatchMapping("/exit/{user_id}")
    public ApiResponse<Long> exit(@PathVariable Long user_id){
        Long userId = loginService.exit(user_id);
        return ApiResponse.ok(user_id);
    }

}
