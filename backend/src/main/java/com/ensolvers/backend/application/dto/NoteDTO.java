package com.ensolvers.backend.application.dto;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoteDTO {

    private Long id;
    private String title;
    private String content;
    private String color;
    private List<CategoryDTO> categories;

    public NoteDTO() {
    }

    public NoteDTO(Long id, String title, String content, String color, List<CategoryDTO> categories) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.color = color;
        this.categories = categories;
    }

    

}
