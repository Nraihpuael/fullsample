package com.ensolvers.backend.application.service;

import java.util.HashSet;
import java.util.Set;
import org.springframework.stereotype.Service;

@Service
public class InvalidTokenService {

    private Set<String> invalidTokens = new HashSet<>();

    public void addToken(String token) {
        invalidTokens.add(token);
    }

    public boolean isTokenInvalid(String token) {
        return invalidTokens.contains(token);
    }
}
