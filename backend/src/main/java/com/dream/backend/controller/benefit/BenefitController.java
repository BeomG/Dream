package com.dream.backend.controller.benefit;

import com.dream.backend.controller.ApiResponse;
import com.dream.backend.controller.benefit.response.BenefitResponse;
import com.dream.backend.service.benefit.BenefitService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/benefit")
public class BenefitController {

    private final BenefitService benefitService;

    @PostMapping("/{user_id}/{welfare_id}/{status}")
    public ApiResponse<Long> addExamine(@PathVariable Long user_id,
                                        @PathVariable Long welfare_id,
                                        @PathVariable int status) {
        Long id = benefitService.addExamine(user_id, welfare_id, status);
        return ApiResponse.ok(id);
    }

    @GetMapping("/{user_id}/{status}")
    public List<BenefitResponse> getUserBenefit(@PathVariable Long user_id,
                                                @PathVariable int status) {
        //user_id와 status가 일치하는 benefit을 찾아온다.
        //찾아와서 해당 welfare_id를 조회한다.
        //welfare_id를 통해서 찾은 복지를 response로 응답한다.

        return benefitService.getUserBenefit(user_id, status);
    }

    @GetMapping("/{user_id}")
    public List<BenefitResponse> getUserAllBenefit(@PathVariable Long user_id) {
        //user_id와 status가 일치하는 benefit을 찾아온다.
        //찾아와서 해당 welfare_id를 조회한다.
        //welfare_id를 통해서 찾은 복지를 response로 응답한다.

        return benefitService.getUserAllBenefit(user_id);
    }

    //맞춤형 복지 사업 이동, 함수명 직관적으로 변경할 것
    @PatchMapping("/change/{user_id}/{welfare_id}/{status}")
    public ApiResponse<Long> changeWelfareStatus(@PathVariable Long user_id, @PathVariable Long welfare_id, @PathVariable int status) {
        Long id = benefitService.changeWelfareStatus(user_id, welfare_id, status);
        return ApiResponse.ok(id);

    }

    //수혜 중 또는 심사 중 복지 사업 취소
    @PatchMapping("/cancel/{user_id}/{welfare_id}/{status}")
    public ApiResponse<Long> cancelWelfare(@PathVariable Long user_id, @PathVariable Long welfare_id, @PathVariable int status){
        Long id = benefitService.cancelWelfare(user_id, welfare_id, status);
        return ApiResponse.ok(id);
    }



}
