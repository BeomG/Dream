package com.dream.backend.service.welfare;

import com.dream.backend.controller.welfare.response.WelfareResponse;
import com.dream.backend.domain.qualification.Qualification;
import com.dream.backend.domain.qualification.repository.QualificationRepository;
import com.dream.backend.domain.welfare.Welfare;
import com.dream.backend.domain.welfare.repository.WelfareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class WelfareService {

    private final WelfareRepository welfareRepository;
    private final QualificationRepository qualificationRepository;

    public List<WelfareResponse> getAllWelfare() {
        List<WelfareResponse> list = new ArrayList<>();
        //모든 Welfare 테이블을 순회하면서 response 로 바꿔준다.
        List<Welfare> welfareAll = welfareRepository.findAll();
        for (Welfare welfare : welfareAll) {
            System.out.print(welfare.getId() + " ");
            Optional<Qualification> qualification = qualificationRepository.findById(welfare.getId());
            Long region_key = qualification.get().getRegion().getId();
            System.out.print(region_key+" ");
            list.add(toResponse(Optional.ofNullable(welfare), region_key));
        }

        return list;
    }

    public List<Welfare> getRegionWelfare(List<Long> list) {
        int i = 0;
        List<Welfare> welfareList = new ArrayList<>();
        for (Long l : list) {
            Optional<Welfare> welfare = welfareRepository.findById(list.get(i));
            welfareList.add(welfare.get());
            i++;
        }
        return welfareList;
    }

    public WelfareResponse getWelfare(Long welfare_id) {
        Optional<Welfare> welfare = welfareRepository.findById(welfare_id);
        Optional<Qualification> qualification = qualificationRepository.findById(welfare_id);
        WelfareResponse response = toResponse(welfare,qualification.get().getRegion().getId());
        return response;
    }

    public WelfareRepository.WelfareNativeVo getWelfareByCode(String code) {
        Optional<WelfareRepository.WelfareNativeVo> dto = welfareRepository.findByWelfareCode(code);
        return dto.get();
    }

    public boolean isWelfareCodeValid(String code) {
        return welfareRepository.existsByWelfareCode(code);
    }

//    - - - - - - - 비즈니스 로직 - - - - - - -- -


    private WelfareResponse toResponse(Optional<Welfare> welfare, Long region_key) {
        return WelfareResponse.builder()
                .id(welfare.get().getId())
                .name(welfare.get().getName())
                .organization(welfare.get().getOrganization())
                .start_date(welfare.get().getStart_date())
                .end_date(welfare.get().getEnd_date())
                .route(welfare.get().getRoute())
                .submission(welfare.get().getSubmission())
                .support_fund(welfare.get().getSupport_fund())
                .description_origin(welfare.get().getDescription_origin())
                .url(welfare.get().getUrl())
                .img(welfare.get().getImg())
                .support_period(welfare.get().getSupport_period())
                .etc(welfare.get().getEtc())
                .welfare_type(welfare.get().getWelfare_type())
                .region_key(region_key)
                .build();

    }

}