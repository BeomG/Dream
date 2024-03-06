package com.dream.backend.domain.bank_client.repository;

import com.dream.backend.domain.bank_client.BankClient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BankClientRepository extends JpaRepository<BankClient, Integer> {
}
