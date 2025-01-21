package com.ensolvers.backend.application.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryDTO {

    private Long id;
    private String name;
    private String color;

    public CategoryDTO() {
    }

    public CategoryDTO(Long id, String name, String color) {
        this.id = id;
        this.name = name;
        this.color = color;
    }

}
