package com.dream.backend.service.qualification;

import com.dream.backend.domain.qualification.Qualification;
import com.dream.backend.domain.qualification.repository.QualificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class QualificationService {

    private final QualificationRepository qualificationRepository;

    public List<Long> getUserWelfareKey(int age, Long regionKey){
        List<Long> list = new ArrayList<>();
        //리포지토리에서 자격조건 테이블에서 현재 regionkey가 같고
        //현재 age보다 테이블 컬럼의 age보다 작으면 welfare_id 가져오기
        List<Qualification> qualificationList = qualificationRepository.findQualificationsByRegionKeyAndAge(regionKey,age);
        for(Qualification q : qualificationList) {
            list.add(q.getId());
        }

        //전국 복지 키 찾기
        qualificationList = qualificationRepository.findByRegionKey(0L);
        for(Qualification q : qualificationList) {
            list.add(q.getId());
        }
        return list;
    }

}

