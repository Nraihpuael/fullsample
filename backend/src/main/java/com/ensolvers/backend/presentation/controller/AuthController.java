package com.ensolvers.backend.presentation.controller;

import com.ensolvers.backend.application.dto.LoginDTO;
import com.ensolvers.backend.application.dto.TokenDTO;
import com.ensolvers.backend.application.dto.UserRequestDTO;
import com.ensolvers.backend.application.dto.UserDTO;
import com.ensolvers.backend.application.service.AuthService;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/")
    public ResponseEntity s() {
        System.out.println("controller");
        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity registerUser(@Valid @RequestBody UserRequestDTO userRequestDTO) {
        UserDTO userDTO = authService.registerUser(userRequestDTO);
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginDTO(@RequestBody LoginDTO loginDTO) {
        String token = authService.loginUser(loginDTO);
        return ResponseEntity.ok(new TokenDTO(token));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUsuario(@RequestHeader("Authorization") String token) {
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        authService.logoutUsuario(token);
        return ResponseEntity.ok().build();
    }

}
