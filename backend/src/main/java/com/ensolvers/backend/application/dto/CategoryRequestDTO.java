package com.ensolvers.backend.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryRequestDTO {

    @NotBlank(message = "Name cannot be blank")
    @Size(min = 1, max = 150, message = "The name must be between 1 and 150 characters long")
    private String name;
    
    @NotBlank(message = "Color cannot be blank")
    @Pattern(regexp = "^#[0-9a-fA-F]{6}$", message = "Color must be a valid hex code (e.g., #ffeb3b)")
    private String color;
    
    public CategoryRequestDTO() {
    }

    public CategoryRequestDTO(String name, String color) {
        this.name = name;
        this.color = color;
    }

    

}
