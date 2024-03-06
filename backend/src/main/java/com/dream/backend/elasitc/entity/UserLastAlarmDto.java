package com.dream.backend.elasitc.entity;

import lombok.Getter;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
public class UserLastAlarmDto {

    public Long id;
    public LocalDateTime lastTime;

    public UserLastAlarmDto(Long id, Long unixTime) {
        this.id = id;
        this.lastTime = new Timestamp(unixTime).toLocalDateTime();
    }
}
