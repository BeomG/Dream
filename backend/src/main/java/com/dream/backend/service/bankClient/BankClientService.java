package com.dream.backend.service.bankClient;

import com.dream.backend.domain.bank_client.BankClient;
import com.dream.backend.domain.bank_client.repository.BankClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BankClientService {

    private final BankClientRepository bankClientRepository;

    public Optional<BankClient> getBankClient(int id) {
        Optional<BankClient> bankClient = bankClientRepository.findById(id);

        return bankClient;
    }

    public void insertBankClient(BankClient bankClient) { bankClientRepository.save(bankClient); }
}
