package com.nzpmc.backend.dto;

import com.nzpmc.backend.model.Account;

public class LoginResponse {
    private Account account;
    private String token;

    public LoginResponse(Account account, String token) {
        this.account = account;
        this.token = token;
    }

    public Account getAccount() {
        return account;
    }
    public void setAccount(Account account) {
        this.account = account;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
}

