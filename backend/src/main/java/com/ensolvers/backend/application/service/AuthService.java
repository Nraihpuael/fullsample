package com.ensolvers.backend.application.service;

import com.ensolvers.backend.application.dto.LoginDTO;
import com.ensolvers.backend.application.dto.UserRequestDTO;
import com.ensolvers.backend.application.dto.UserDTO;
import com.ensolvers.backend.application.mapper.UserMapper;
import com.ensolvers.backend.domain.entity.User;
import com.ensolvers.backend.infrastructure.exception.ExistingUserException;
import com.ensolvers.backend.infrastructure.exception.RegisterUserException;
import com.ensolvers.backend.infrastructure.security.JwtTokenProvider;
import com.ensolvers.backend.persistence.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final InvalidTokenService invalidTokenService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, InvalidTokenService invalidTokenService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.invalidTokenService = invalidTokenService;
    }

    public UserDTO registerUser(UserRequestDTO userRequestDTO) {
        if (userRepository.findByEmail(userRequestDTO.getEmail()) != null) {
            throw new ExistingUserException("The user with the email " + userRequestDTO.getEmail() + " already exists.");
        }
        try {
            User user = UserMapper.toEntity(userRequestDTO);
            user.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));
            userRepository.save(user);
            return UserMapper.toUserInfoDTO(user);
        } catch (Exception e) {
            throw new RegisterUserException("Error during user registration", e);
        }
    }

    public String loginUser(LoginDTO loginDTO) {
        User user = userRepository.findByEmail(loginDTO.getEmail());
        if (user != null && passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDTO.getEmail(),
                            loginDTO.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return jwtTokenProvider.generateToken(user.getEmail());
        } else {
            throw new RuntimeException("Incorrect email or password");
        }
    }

    public void logoutUsuario(String token) {
        SecurityContextHolder.clearContext();
        invalidTokenService.addToken(token);
    }
}
