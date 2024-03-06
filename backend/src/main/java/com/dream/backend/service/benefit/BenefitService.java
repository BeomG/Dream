package com.dream.backend.service.benefit;

import com.dream.backend.controller.benefit.response.BenefitResponse;
import com.dream.backend.domain.benefit.Benefit;
import com.dream.backend.domain.benefit.repostiory.BenefitRepository;
import com.dream.backend.domain.qualification.Qualification;
import com.dream.backend.domain.qualification.repository.QualificationRepository;
import com.dream.backend.domain.user.User;
import com.dream.backend.domain.user.repository.UserRepository;
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
public class BenefitService {
    private final BenefitRepository benefitRepository;
    private final WelfareRepository welfareRepository;
    private final UserRepository userRepository;
    private final QualificationRepository qualificationRepository;

    public Long addExamine(Long userId, Long welfareId, int status) {
        Optional<Welfare> welfare = welfareRepository.findById(welfareId);
        Optional<User> user = userRepository.findById(userId);
        Benefit benefit = toEntity(welfare, user, status);
        Benefit savedBenefit = benefitRepository.save(benefit);
        return savedBenefit.getId();
    }

    public void addUserBenefit(Long userId, List<Long> list, int status) {
        //list는 사용자의 복지카드 리스트의 복지식별키이다.
        Optional<User> savedUser = userRepository.findById(userId);
        for (int i = 0; i < list.size(); i++) {
            Optional<Welfare> savedWelfare = welfareRepository.findById(list.get(i));
//            savedUser.get().addFund(savedWelfare.get().getSupport_fund());
            Benefit benefit = Benefit.builder()
                    .user(savedUser.get())
                    .welfare(savedWelfare.get())
                    .status(status)
                    .build();
            benefitRepository.save(benefit);
        }

    }

    public List<BenefitResponse> getUserBenefit(Long userId, int status) {
        List<BenefitResponse> list = new ArrayList<>();
        List<Benefit> benefits = benefitRepository.findByUserIdAndStatus(userId, status).orElseThrow();
        //순회하면서 해당 benefit의 welfare_id를 찾아온다.
        for (Benefit benefit : benefits) {
            Long welfareId = benefit.getWelfare().getId();
            System.out.println("사용자 등록한 복지(2가지 종류, staus에 따라 결정)" + welfareId);
            //welfareId 를 통해서 Welfare 객체를 가져온다.
            Optional<Welfare> welfare = welfareRepository.findById(welfareId);
            Optional<Qualification> qualification = qualificationRepository.findById(welfareId);
            list.add(toResponse(welfare, qualification.get().getRegion().getId()));
        }
        return list;
    }

    public List<BenefitResponse> getUserAllBenefit(Long userId) {
        List<BenefitResponse> list = new ArrayList<>();
        List<Benefit> benefitList = benefitRepository.findAllByUser_Id(userId);
        for (Benefit benefit : benefitList) {
            Long welfareId = benefit.getWelfare().getId();
            System.out.println("사용자 등록한 복지(2가지 종류, status에 따라 결정)" + welfareId);
            //welfareId 를 통해서 Welfare 객체를 가져온다.
            Optional<Welfare> welfare = welfareRepository.findById(welfareId);
            Optional<Qualification> qualification = qualificationRepository.findById(welfareId);
            list.add(toResponse(welfare, qualification.get().getRegion().getId()));
        }
        return list;
    }


    public Long changeWelfareStatus(Long userId, Long welfareId, int status) {
        Optional<Benefit> benefit = benefitRepository.findByUser_IdAndWelfare_Id(userId, welfareId);
        Optional<Welfare> welfare = welfareRepository.findById(welfareId);
        int support_fund = welfare.get().getSupport_fund();
        Optional<User> user = userRepository.findById(userId);
        //user의 benefit의 상태를 status로 만든다.
        benefit.get().changeStatusToNum(user.get(), status, support_fund);
        return benefit.get().getId();

    }

    //복지 사업 취소
    public Long cancelWelfare(Long userId, Long welfareId, int status) {
        Optional<Benefit> benefit = benefitRepository.findByUser_IdAndWelfare_Id(userId, welfareId);
        Optional<Welfare> welfare = welfareRepository.findById(welfareId);
        Optional<User> user = userRepository.findById(userId);
        int suppot_fund = welfare.get().getSupport_fund();
        benefit.get().cancelStatus(user.get(), status, suppot_fund);
        return benefit.get().getId();
    }

    //- - - - - - - - - 비즈니스 로직 - - - - - - - - -
    private Benefit toEntity(Optional<Welfare> welfare, Optional<User> user, int status) {
        return Benefit.builder()
                .welfare(welfare.get())
                .user(user.get())
                .status(status)
                .build();
    }

    private BenefitResponse toResponse(Optional<Welfare> welfare, Long region_key) {
        return BenefitResponse.builder()
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
                .id(welfare.get().getId())
                .regionKey(region_key)
                .welfareType(welfare.get().getWelfare_type())
                .build();

    }


}
