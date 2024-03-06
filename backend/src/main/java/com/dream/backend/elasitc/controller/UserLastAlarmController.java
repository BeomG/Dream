package com.dream.backend.elasitc.controller;

import com.dream.backend.elasitc.entity.UserLastAlarmDto;
import com.dream.backend.elasitc.service.UserLastAlarmService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/alarm")
public class UserLastAlarmController {

    private final UserLastAlarmService alarmService;

    @GetMapping("/get/{user_id}")
    public UserLastAlarmDto getUserLastDateTime(@PathVariable("user_id") Long userId) {
        alarmService.setClient();
        UserLastAlarmDto alarm = alarmService.getUserAlarmInfo(userId);
        alarmService.closeAllClient();
        return alarm;
    }

    @PostMapping("/insert/{user_id}")
    public String insertDateTime(@PathVariable("user_id") Long userId) {
        alarmService.setClient();
        alarmService.insertDate(userId);
        alarmService.closeAllClient();
        return "OK";
    }
}
