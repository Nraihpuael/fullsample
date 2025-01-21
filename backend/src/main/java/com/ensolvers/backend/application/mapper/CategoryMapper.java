package com.ensolvers.backend.application.mapper;

import com.ensolvers.backend.application.dto.CategoryDTO;
import com.ensolvers.backend.application.dto.CategoryRequestDTO;
import com.ensolvers.backend.domain.entity.Category;
import com.ensolvers.backend.domain.entity.User;
import java.util.List;
import java.util.stream.Collectors;

public class CategoryMapper {

    public static Category toEntity(CategoryRequestDTO categoryRequestDTO, User user) {
        if (categoryRequestDTO == null) {
            return null;
        }
        Category category = new Category();
        category.setName(categoryRequestDTO.getName());
        category.setColor(categoryRequestDTO.getColor());
        category.setUser(user);
        return category;
    }

    public static void updateEntity(Category category, CategoryRequestDTO categoryRequestDTO) {
        if (categoryRequestDTO != null) {
            category.setName(categoryRequestDTO.getName());
            category.setColor(categoryRequestDTO.getColor());
        }

    }

    public static CategoryDTO toDTO(Category category) {
        if (category == null) {
            return null;
        }
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(category.getId());
        categoryDTO.setName(category.getName());
        categoryDTO.setColor(category.getColor());
        return categoryDTO;
    }

    public static List<CategoryDTO> toDTOList(List<Category> categories) {
        return categories.stream().map(CategoryMapper::toDTO).collect(Collectors.toList());
    }

}
