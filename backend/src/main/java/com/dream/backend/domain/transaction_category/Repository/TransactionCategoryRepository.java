package com.dream.backend.domain.transaction_category.Repository;

import com.dream.backend.domain.transaction_category.TransactionCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionCategoryRepository extends JpaRepository<TransactionCategory, Integer> {
}
