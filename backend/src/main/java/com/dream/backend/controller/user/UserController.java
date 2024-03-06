package com.dream.backend.controller.user;

import com.dream.backend.controller.ApiResponse;
import com.dream.backend.controller.user.request.ChangePwdRequest;
import com.dream.backend.controller.user.request.JoinUserRequest;
import com.dream.backend.controller.user.response.UserFundResponse;
import com.dream.backend.controller.user.response.UserLoginResponse;
import com.dream.backend.controller.user.response.UserResponse;
import com.dream.backend.domain.user.User;
import com.dream.backend.service.user.UserService;
import com.dream.backend.service.user.dto.JoinUserDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @PostMapping("/signup/{type}")
    public ApiResponse<UserLoginResponse> joinUser(@RequestBody JoinUserRequest request, @PathVariable boolean type) {
        JoinUserDto dto = request.toDto();
        System.out.print("controller region key" + dto.getRegionKey());
        return ApiResponse.ok(userService.joinUser(dto,type).getData());
    }

    @GetMapping("/fund/{user_id}")
    public UserFundResponse getUserFund(@PathVariable Long user_id) {
        Optional<User> user = userService.getUserFund(user_id);
        UserFundResponse userResponse = user.get().toFundResponse(user);
        return userResponse;
    }

    @GetMapping("/fund2")
    public UserFundResponse getUserFund() {
        Optional<User> user = userService.getUserFund(1L);
        UserFundResponse userResponse = user.get().toFundResponse(user);
        return userResponse;
    }

    @GetMapping("/{user_id}")
    public UserResponse getUserInfo(@PathVariable Long user_id) {
        UserResponse userResponse = userService.getUserInfo(user_id);
        return userResponse;
    }

    @PatchMapping("/{user_id}/region/{region_key}")
    public UserResponse changeUserInfo(@PathVariable Long user_id, @PathVariable Long region_key) {
        UserResponse userResponse = userService.changeUserRegion(user_id, region_key);
        return userResponse;
    }

    @PatchMapping("/{user_id}/pwd")
    public ApiResponse<UserResponse> changeUserPwd(@PathVariable Long user_id, @RequestBody ChangePwdRequest request) {
        String pwd = request.getPwd();
        UserResponse response = userService.changeUserPwd(user_id, pwd);
        return ApiResponse.ok(response);
    }

    @PatchMapping("connection/{user_id}/{my_data}")
    public ApiResponse<Long> connectionMyData(@PathVariable Long user_id , @PathVariable int my_data){
        Long id = userService.connectionMyData(user_id,my_data, 1);
        return ApiResponse.ok(id);

    }


}
