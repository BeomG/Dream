package com.dream.backend.domain.bank.repository;

import com.dream.backend.domain.bank.Bank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface bankRepository extends JpaRepository<Bank, String> {
}
