package com.dream.backend.controller.welfare.response;

import com.dream.backend.domain.welfare.Welfare;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;

@Data
@Getter
public class WelfareResponse {

    private Long id;

    private String name;

    private String organization;

    private LocalDateTime start_date;

    private LocalDateTime end_date;

    private String route;

    private String submission;

    private int support_fund;

    private String description_origin;

    private String url;

    private String img;

    private int support_period;

    String etc;

    private String welfare_type;

    private Long regionKey;


    @Builder
    public WelfareResponse(Long id, String name, String organization, LocalDateTime start_date, LocalDateTime end_date, String route, String submission, int support_fund, String description_origin, String url, String img, int support_period, String etc, String welfare_type, Long region_key) {
        this.id = id;
        this.name = name;
        this.organization = organization;
        this.start_date = start_date;
        this.end_date = end_date;
        this.route = route;
        this.submission = submission;
        this.support_fund = support_fund;
        this.description_origin = description_origin;
        this.url = url;
        this.img = img;
        this.support_period = support_period;
        this.etc = etc;
        this.welfare_type = welfare_type;
        this.regionKey = region_key;

    }

    //    - - -  비즈니스 로직 - - - - - -
    public static WelfareResponse toResponse(Welfare welfare, Long region_key) {
        return WelfareResponse.builder()
                .id(welfare.getId())
                .name(welfare.getName())
                .organization(welfare.getOrganization())
                .start_date(welfare.getStart_date())
                .end_date(welfare.getEnd_date())
                .route(welfare.getRoute())
                .submission(welfare.getSubmission())
                .support_fund(welfare.getSupport_fund())
                .description_origin(welfare.getDescription_origin())
                .url(welfare.getUrl())
                .img(welfare.getImg())
                .support_period(welfare.getSupport_period())
                .etc(welfare.getEtc())
                .welfare_type(welfare.getWelfare_type())
                .region_key(region_key)
                .build();
    }
}
