package com.dream.backend.domain.benefit.repostiory;

import com.dream.backend.domain.benefit.Benefit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BenefitRepository extends JpaRepository<Benefit, Long> {
    Optional<List<Benefit>> findByUserIdAndStatus(Long user_id, int status);

    List<Benefit> findAllByUser_Id(Long userId);

//    @Query("SELECT b FROM Benefit b WHERE b.user.id = :userId AND b.welfare.id = :welfareId")
    Optional<Benefit> findByUser_IdAndWelfare_Id(Long id, Long welfareKey);

    void deleteAllByIdAndStatus(Long id, int status);
}
