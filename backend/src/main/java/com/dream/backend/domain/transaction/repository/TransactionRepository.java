package com.dream.backend.domain.transaction.repository;

import com.dream.backend.domain.account.Account;
import com.dream.backend.domain.transaction.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findAllByAccount(Optional<Account> account);

//    @Query("SELECT t FROM Transaction t WHERE t.tranDesc LIKE %:welfareCode%")
    Optional<Transaction> findByTranDesc(String welfareCode);

    // ----- 비지니스 로직 ----- //

    @Query(value = "SELECT * FROM transaction t WHERE t.tran_date BETWEEN :start_date AND :end_date AND t.account_number = :account_number", nativeQuery = true)
    List<Transaction> findAllByDateRangeAndAccount(@Param("start_date") LocalDateTime start, @Param("end_date") LocalDateTime end, @Param("account_number") Long account);
}
