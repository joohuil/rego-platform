package com.nzpmc.backend.service;

import com.nzpmc.backend.model.Account;
import com.nzpmc.backend.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public List<Account> getAccounts() {
        return accountRepository.findAll();
    }

    public Optional<Account> getAccountByEmail (String email) {
        return accountRepository.findById (email);
    }

    public Account saveAccount(Account account) {
        accountRepository.save(account);
        return account;
    }
}
