package com.dream.backend.controller.transaction;

import com.dream.backend.controller.ApiResponse;
import com.dream.backend.controller.transaction.request.TransactionRequest;
import com.dream.backend.controller.transaction.response.TransactionObject;
import com.dream.backend.controller.transaction.response.TransactionResponse;
import com.dream.backend.controller.transaction.response.WelfareAndTransactionResponse;
import com.dream.backend.controller.transaction.response.WelfareListResponse;
import com.dream.backend.domain.account.Account;
import com.dream.backend.domain.transaction.Transaction;
import com.dream.backend.domain.welfare.repository.WelfareRepository;
import com.dream.backend.elasitc.service.UserLastAlarmService;
import com.dream.backend.service.account.AccountService;
import com.dream.backend.service.transaction.TransactionService;
import com.dream.backend.service.welfare.WelfareService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/banking/transaction")
public class TransactionController {

    private final TransactionService transactionService;
    private final UserLastAlarmService alarmService;
    private final WelfareService welfareService;
    private final AccountService accountService;

    @GetMapping("/all")
    public List<Transaction> getAllTransaction() {
        List<Transaction> result = transactionService.getAllTransaction();

        return result;
    }

    @GetMapping("/range/{account_number}/{start_date}/{end_date}")
    public TransactionResponse getRangedTransaction(
            @PathVariable("account_number") Long account,
            @PathVariable("start_date") String start,
            @PathVariable("end_date") String end) {

        List<TransactionObject> list = new ArrayList<>();

        int year = Integer.parseInt(start.substring(0, 4));
        int month = Integer.parseInt(start.substring(5, 7));
        int day = Integer.parseInt(start.substring(8, 10));
        LocalDateTime sDate = LocalDate.of(year, month, day).atStartOfDay();

        int eYear = Integer.parseInt(end.substring(0, 4));
        int eMonth = Integer.parseInt(end.substring(5, 7));
        int eDay = Integer.parseInt(end.substring(8, 10));
        LocalDateTime eDate = LocalDate.of(eYear, eMonth, eDay).plusDays(1).atStartOfDay();

        List<Transaction> result =  transactionService.getTransactionByDateRange(sDate, eDate, account);
       if(result.isEmpty()) return null;

        Account acc = result.get(0).getAccount();
        for(Transaction t: result) {
            list.add(TransactionObject.builder()
                    .dateTime(t.getTranDate())
                    .type(t.getInoutType())
                    .category(null)
                    .tranDesc(t.getTranDesc())
                    .tranAmt(t.getTranAmt())
                    .afterAmt(t.getBalance())
                    .build());
        }

        return TransactionResponse.builder()
                .account(acc)
                .list(list)
                .build();
    }

    @GetMapping("/{account_number}")
    public TransactionResponse getTransactionByAccount(
            @PathVariable("account_number") Long accountNumber) {

        List<TransactionObject> list = new ArrayList<>();
        List<Transaction> result = transactionService.getTransactionByAccountNumber(accountNumber);

        Account account = result.get(0).getAccount();

        for(Transaction t: result) {
            list.add(TransactionObject.builder()
                    .dateTime(t.getTranDate())
                    .type(t.getInoutType())
                    .category(null)
                    .tranDesc(t.getTranDesc())
                    .tranAmt(t.getTranAmt())
                    .afterAmt(t.getBalance())
                    .build());
        }

        return TransactionResponse.builder()
                .account(account)
                .list(list)
                .build();
    }

    @GetMapping("/fromLastTime/{user_id}")
    public TransactionResponse getTransactionFromLastTime(
            @PathVariable("user_id") Long userId) {


        List<TransactionObject> list = new ArrayList<>();
        List<Transaction> result = transactionService.getTransactionFromLastTime(userId);
        if(result.isEmpty()) return null;
        Account account = result.get(0).getAccount();
        if(account == null) return null;

        for(Transaction t: result) {
            list.add(TransactionObject.builder()
                    .dateTime(t.getTranDate())
                    .type(t.getInoutType())
                    .category(null)
                    .tranDesc(t.getTranDesc())
                    .tranAmt(t.getTranAmt())
                    .afterAmt(t.getBalance())
                    .build());
        }

        alarmService.setClient();
        alarmService.insertDate(userId);
        alarmService.closeAllClient();

        return TransactionResponse.builder()
                .account(account)
                .list(list)
                .build();
    }

    @GetMapping("/monthly/{user_id}")
    public TransactionResponse getTransactionFromLast30days(@PathVariable("user_id") Long userId) {

        LocalDateTime today = LocalDateTime.now();
        LocalDateTime thirtyDaysAgo = today.minusDays(30);

        List<TransactionObject> list = new ArrayList<>();
        List<Transaction> result = transactionService.getTransactionByDateRange(thirtyDaysAgo, today, userId);
        Account account =  accountService.getAccount(userId).get();

        if(result.isEmpty() || account == null) return null;

        for(Transaction t: result) {
            list.add(new TransactionObject(t.getTranDate(), t.getInoutType(), null, t.getTranDesc(), t.getTranAmt(), t.getBalance()));
        }

        return TransactionResponse.builder()
                .account(account)
                .list(list)
                .build();
    }

    @GetMapping("/withWelfare/{account_number}")
    public WelfareListResponse getWelfareAndTransaction(@PathVariable("account_number") Long accountNumber) {

        List<WelfareAndTransactionResponse> list = new ArrayList<>();
        List<Transaction> result = transactionService.getTransactionByAccountNumber(accountNumber);
        Account account =  accountService.getAccount(accountNumber).get();

        if(result.isEmpty() || account == null) return null;

        for(Transaction t: result) {
            String code = t.getTranDesc();

            WelfareAndTransactionResponse transactionResponse = WelfareAndTransactionResponse.builder()
                    .dateTime(t.getTranDate())
                    .type(t.getInoutType())
                    .category(null)
                    .welfare(null)
                    .tranDesc(t.getTranDesc())
                    .tranAmt(t.getTranAmt())
                    .afterAmt(t.getBalance())
                    .build();

            if(welfareService.isWelfareCodeValid(t.getTranDesc())) {
                WelfareRepository.WelfareNativeVo response = welfareService.getWelfareByCode(code);
                transactionResponse.setWelfare(response);
            }

            list.add(transactionResponse);
        }

        return WelfareListResponse.builder()
                .account(account)
                .list(list)
                .build();
    }

    @PostMapping("/deposit")
    public ApiResponse<TransactionRequest> depositToAccount(@RequestBody TransactionRequest request) {

        if(!transactionService.isAccountValid(request.getAccount_number())) {
            return ApiResponse.badRequest("Unknown Account Number");
        }

        if(!transactionService.isInoutTypeValid(request.getInout_type())) {
            return ApiResponse.badRequest("Not Supported Inout Type");
        }

        if(request.getTran_amt() <= 0) {
            return ApiResponse.badRequest("TranAmt Must Be Greater Than 0");
        }

        transactionService.insertTransaction(request);
        return ApiResponse.ok(request);
    }
}
