package com.dream.backend.elasitc.service;

import co.elastic.clients.elasticsearch.core.GetResponse;
import co.elastic.clients.elasticsearch.core.IndexResponse;
import com.dream.backend.domain.user.User;
import com.dream.backend.elasitc.entity.UserLastAlarm;
import com.dream.backend.elasitc.entity.UserLastAlarmDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class UserLastAlarmService extends ElasticConnectionService {

    public void createIndex() {
        try {
            esClient.indices().create(c -> c.index("user_alarm_date"));
        } catch(IOException e) {
            e.printStackTrace();
        }
    }

    public String insertDate(Long userId) {
        try {
            Long unixNow = Timestamp.valueOf(LocalDateTime.now()).getTime();
            UserLastAlarm data = UserLastAlarm.builder()
                    .id(userId)
                    .dateTime(unixNow)
                    .build();
            IndexResponse response = esClient.index(i -> i
                    .index("user_alarm_date")
                    .id(Long.toString(userId))
                    .document(data));
        } catch(IOException e) {
            e.printStackTrace();
        }

        return "OK";
    }

    public Long getDateTime(Long userId) {
        try {
            GetResponse<UserLastAlarm> response = esClient.get(g -> g
                            .index("user_alarm_date")
                            .id(Long.toString(userId)),
                    UserLastAlarm.class
            );

            if(response.found())
                return response.source().getDateTime();
        } catch(IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    public UserLastAlarmDto getUserAlarmInfo(Long userId) {
        try {
            GetResponse<UserLastAlarm> response = esClient.get(g -> g
                            .index("user_alarm_date")
                            .id(Long.toString(userId)),
                    UserLastAlarm.class
            );

            if(response.found()) {
                return new UserLastAlarmDto(response.source().getId(), response.source().getDateTime());
            }
        } catch(IOException e) {
            e.printStackTrace();
        }

        return null;
    }
}
