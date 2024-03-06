package com.dream.backend.controller.welfare;

import com.dream.backend.controller.welfare.response.WelfareResponse;
import com.dream.backend.domain.welfare.Welfare;
import com.dream.backend.service.qualification.QualificationService;
import com.dream.backend.service.welfare.WelfareService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/welfare")
public class WelfareController {

    private final WelfareService welfareService;
    private final QualificationService qualificationService;

    //[전체 복지 정보 조회]
    @GetMapping("/all")
    public List<WelfareResponse> getAllWelfare() {
        return welfareService.getAllWelfare();
    }

    //[사용자와 관계없이 지역 분류]
    @GetMapping("/{regionKey}")
    public List<WelfareResponse> getRegionWelfare(@PathVariable Long regionKey) {
        List<WelfareResponse> response = new ArrayList<>();
        List<Long> list = qualificationService.getUserWelfareKey(0, regionKey);
        List<Welfare> welfareList = welfareService.getRegionWelfare(list);
        System.out.print("해당 지역의 복지 식별키: ");
        for (Welfare welfare : welfareList) {
            System.out.print(welfare.getId() + " ");
            response.add(WelfareResponse.toResponse(welfare,1L));
        }
        return response;
    }

    @GetMapping("/detail/{welfare_id}")
    public WelfareResponse getWelfare(@PathVariable Long welfare_id) {

        return welfareService.getWelfare(welfare_id);
    }
}
