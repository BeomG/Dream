package com.dream.backend.domain.qualification.repository;

import com.dream.backend.domain.qualification.Qualification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QualificationRepository extends JpaRepository<Qualification, Long> {
    @Query("SELECT q FROM Qualification q WHERE q.region.id = :regionKey AND q.age > :age")
    List<Qualification> findQualificationsByRegionKeyAndAge(@Param("regionKey") Long regionKey, @Param("age") int age);
    @Query("SELECT  q FROM Qualification  q WHERE q.region.id = :regionKey")
    List<Qualification> findByRegionKey(@Param("regionKey") Long regionKey);
}
