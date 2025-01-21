package com.ensolvers.backend.infrastructure.exception;


public class AccessDeniedException extends RuntimeException {

    public AccessDeniedException(String message) {
        super(message);
    }
    
}
