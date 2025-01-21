package com.ensolvers.backend.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoteRequestDTO {

    @NotBlank(message = "Title cannot be blank")
    @Size(min = 1, max = 50, message = "The Title must be between 1 and 50 characters long")
    private String title;

    private String content;

    @NotBlank(message = "Color cannot be blank")
    @Pattern(regexp = "^#[0-9a-fA-F]{6}$", message = "Color must be a valid hex code (e.g., #ffeb3b)")
    private String color;
    
    private List<Long> categoryIds;

    public NoteRequestDTO() {
    }

    public NoteRequestDTO(String title, String content, String color, List<Long> categoryIds) {
        this.title = title;
        this.content = content;
        this.color = color;
        this.categoryIds = categoryIds;
    }

    

}
