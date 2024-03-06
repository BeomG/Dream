package com.dream.backend.service.transaction;

import com.dream.backend.controller.transaction.request.TransactionRequest;
import com.dream.backend.domain.account.Account;
import com.dream.backend.domain.account.repository.AccountRepository;
import com.dream.backend.domain.inout_type.InoutType;
import com.dream.backend.domain.inout_type.Repository.InoutTypeRepository;
import com.dream.backend.domain.transaction.Transaction;
import com.dream.backend.domain.transaction.repository.TransactionRepository;
import com.dream.backend.domain.user.repository.UserRepository;
import com.dream.backend.elasitc.service.UserLastAlarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final InoutTypeRepository inoutTypeRepository;
    private final UserLastAlarmService alarmService;
    private final UserRepository userRepository;

    public boolean isAccountValid(Long accountNumber) {
        return accountRepository.existsById(accountNumber);
    }

    public boolean isInoutTypeValid(int type) {
        return inoutTypeRepository.existsById(type);
    }

    public List<Transaction> getAllTransaction() {
        return transactionRepository.findAll();
    }

    public List<Transaction> getTransactionByAccountNumber(Long accountNumber) {
        Optional<Account> account = accountRepository.findById(accountNumber);
        return transactionRepository.findAllByAccount(account);
    }

    public List<Transaction> getTransactionByDateRange(LocalDateTime startDate, LocalDateTime endDate, Long accountNumber) {
//        Optional<Account> account = accountRepository.findById(accountNumber);
//        List<Transaction> result = transactionRepository.findAllByAccount(account);
//
//        List<Transaction> filtered = new ArrayList<>();
//        long unixStartDate = Timestamp.valueOf(startDate).getTime();
//        long unixEndDate = Timestamp.valueOf(endDate).getTime();
//
//        for (Transaction t: result) {
//            long tranDate = Timestamp.valueOf(t.getTranDate()).getTime();
//
//            if(tranDate < unixStartDate) continue;
//            if(tranDate > unixEndDate) continue;
//            filtered.add(t);
//        }
//
//        return filtered;

        return transactionRepository.findAllByDateRangeAndAccount(startDate, endDate, accountNumber);
    }

    public List<Transaction> getTransactionFromLastTime(Long userId) {
        Long accountNumber = userRepository.findById(userId).get().getAccount();
//        Optional<Account> account = accountRepository.findById(accountNumber);
        alarmService.setClient();
        LocalDateTime startTime = new Timestamp(alarmService.getDateTime(userId)).toLocalDateTime();
        alarmService.closeAllClient();
        LocalDateTime endTime = LocalDateTime.now();

        return getTransactionByDateRange(startTime, endTime, accountNumber);
    }

    public void insertTransaction(TransactionRequest request) {
        Optional<Account> account = accountRepository.findById(request.getAccount_number());
        int amt = request.getInout_type() == 0 ? request.getTran_amt() : -request.getTran_amt();
        int after_amt = account.get().getBalance() + amt;
        Optional<InoutType> type = inoutTypeRepository.findById(request.getInout_type());
        Transaction transaction = Transaction.toEntity(request, account.get(), after_amt, type.get());
        transactionRepository.save(transaction);

        Account update = account.get();
        update.setBalance(after_amt);
        accountRepository.save(update);
    }
}
