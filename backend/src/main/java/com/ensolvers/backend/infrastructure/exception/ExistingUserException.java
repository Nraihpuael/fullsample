package com.ensolvers.backend.infrastructure.exception;


public class ExistingUserException extends RuntimeException {

    public ExistingUserException(String message) {
        super(message);
    }
}
