package com.nzpmc.backend.controller;

import com.nzpmc.backend.model.Account;
import com.nzpmc.backend.repository.AccountRepository;
import com.nzpmc.backend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("api/accounts")
public class AccountController {
    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService, AccountRepository accountRepository) {
        this.accountService = accountService;
    }

    @GetMapping
    public ResponseEntity<Object> getAccounts() {
        List<Account> accounts = accountService.getAccounts();
        return ResponseEntity.ok().body(accounts);
    }

    @GetMapping("{email}")
    public ResponseEntity<Object> getAccountByEmail(@PathVariable String email) {
        Optional<Account> account = accountService.getAccountByEmail(email);
        if (account.isPresent()) {
            return ResponseEntity.ok().body(account.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Object> createAccount(@RequestBody Account account) {
        if (account.getEmail() == null || account.getEmail().isEmpty() ||
                account.getName() == null || account.getName().isEmpty() ||
                account.getPassword() == null || account.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Account details are required"));
        }
        Optional<Account> existingAccount = accountService.getAccountByEmail(account.getEmail());
        if (existingAccount.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    Map.of("error", "An account already exists under this email.")
            );
        }
        Account addedAccount = accountService.saveAccount(account);
        return ResponseEntity.ok(addedAccount);
    }

    @PutMapping("{email}")
    public ResponseEntity<Object> updateAccountName(@PathVariable String email, @RequestBody Account account) {
        if (account.getName() == null || account.getName().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Please provide a name to change to."));
        }
        Optional<Account> existingAccount = accountService.getAccountByEmail(email);
        if (existingAccount.isPresent()) {
            existingAccount.get().setName(account.getName());
            accountService.saveAccount(existingAccount.get());
            return ResponseEntity.ok().body(existingAccount.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("{email}/events")
    public ResponseEntity<Object> updateAccountEvents(@PathVariable String email, @RequestBody Account account) {
        Optional<Account> existingAccount = accountService.getAccountByEmail(email);
        if (existingAccount.isPresent() && account.getEvents() != null) {
            existingAccount.get().setEvents(account.getEvents());
            accountService.saveAccount(existingAccount.get());
            return ResponseEntity.ok().body(existingAccount.get());
        }
        return ResponseEntity.notFound().build();
    }
}
