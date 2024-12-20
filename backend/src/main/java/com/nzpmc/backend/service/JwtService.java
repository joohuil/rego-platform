package com.nzpmc.backend.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtService {

    private final String SECRET_KEY;
    private final String TOKEN_EXPIRY;

    public JwtService(@Value("${jwt.secret.key}") String SECRET_KEY,
                      @Value("${jwt.token.expiry}") String TOKEN_EXPIRY) {
        this.SECRET_KEY = SECRET_KEY;
        this.TOKEN_EXPIRY = TOKEN_EXPIRY;
        System.out.println("JwtService initialized");
    }

    public String generateToken(String email) {
        Instant now = Instant.now();
        Date issuedAt = Date.from(now);
        Date expiration = Date.from(now.plusMillis(Long.parseLong(TOKEN_EXPIRY)));
        Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
        return Jwts.builder()
                .subject(email)
                .issuedAt(issuedAt)
                .expiration(expiration)
                .signWith(key)
                .compact();
    }
    public String extractEmail(String token) {
        SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}
