package com.dream.backend.service.account;

import com.dream.backend.domain.account.Account;
import com.dream.backend.domain.account.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    public Optional<Account> getAccount(Long id) {
        Optional<Account> account = accountRepository.findById(id);
        return account;
    }

    public void insertAccount(Account item) {
        accountRepository.save(item);
    }

    public void updateBalance(Long accountNumber, int after_amt) {
        Optional<Account> account = accountRepository.findById(accountNumber);

        account.get().changeBalance(after_amt);
    }
}
