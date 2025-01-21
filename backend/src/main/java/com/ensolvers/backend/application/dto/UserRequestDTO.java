
package com.ensolvers.backend.application.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UserRequestDTO {
    @NotBlank(message = "Name is required")
    @Size(min = 1, max = 50, message = "The name must be between 1 and 50 characters long")
    @Pattern(regexp = "^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$", message = "The name can only contain letters and spaces")
    private String name;

    
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be in a valid format")
    private String email;

    
    @NotBlank(message = "Password is required")
    @Size(min = 5, message = "Password must be at least 5 characters long")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{5,}$", message = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
    private String password;

    public UserRequestDTO() {
    }

    
    public UserRequestDTO(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    
    
}
