package com.dream.backend.elasitc.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserLastAlarm {

    private Long id;
    private Long dateTime;

    // - - - - 비지니스 로직 - - - - //
}
