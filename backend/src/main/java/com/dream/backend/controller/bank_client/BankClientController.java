package com.dream.backend.controller.bank_client;


import com.dream.backend.domain.bank_client.BankClient;
import com.dream.backend.service.bankClient.BankClientService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bank_client")
@Slf4j
public class BankClientController {

    private final BankClientService bankClientService;

    @GetMapping("/{client_key}")
    public Optional<BankClient> getBankClient(@PathVariable("client_key") int client_key) {
        Optional<BankClient> bankClient = bankClientService.getBankClient(client_key);

        return bankClient;
    }

    @PostMapping("/")
    public void insertBankClient(@RequestBody BankClient bankClient) {
        bankClientService.insertBankClient(bankClient);
    }
}
