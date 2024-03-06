package com.dream.backend.domain.welfare.repository;

import com.dream.backend.domain.welfare.Welfare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WelfareRepository extends JpaRepository<Welfare, Long> {

    List<Welfare> findAll();
    Welfare findWelfareCodeById(Long welfareId);

    // ---- 비지니스 로직 ---- //

    @Query(value = "SELECT name, organization FROM welfare WHERE welfare_code = :code", nativeQuery = true)
    Optional<WelfareNativeVo> findByWelfareCode(@Param(value = "code") String welfareCode);

    interface WelfareNativeVo {
        String getName();
        String getOrganization();
    }

    boolean existsByWelfareCode(String code);
}
