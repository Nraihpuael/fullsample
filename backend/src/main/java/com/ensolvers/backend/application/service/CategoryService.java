package com.ensolvers.backend.application.service;

import com.ensolvers.backend.application.dto.CategoryDTO;
import com.ensolvers.backend.application.dto.CategoryRequestDTO;
import com.ensolvers.backend.application.mapper.CategoryMapper;
import com.ensolvers.backend.domain.entity.Category;
import com.ensolvers.backend.domain.entity.User;
import com.ensolvers.backend.infrastructure.exception.AccessDeniedException;
import com.ensolvers.backend.infrastructure.exception.ResourceNotFoundException;
import com.ensolvers.backend.persistence.repository.CategoryRepository;
import com.ensolvers.backend.persistence.repository.UserRepository;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public CategoryService(CategoryRepository categoryRepository, UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    public CategoryDTO getCategory(Long id, String email) {
        User user = userRepository.findByEmail(email);
        Category category = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found with id " + id));
        if (category.getUser().getId().equals(user.getId())) {
            return CategoryMapper.toDTO(category);
        } else {
            throw new AccessDeniedException("You do not have permission to access this category.");
        }
    }

    public CategoryDTO createCategory(CategoryRequestDTO categoryRequestDTO, String email) {
        User user = userRepository.findByEmail(email);
        Category category = CategoryMapper.toEntity(categoryRequestDTO, user);
        categoryRepository.save(category);
        return CategoryMapper.toDTO(category);
    }

    public CategoryDTO updateCategory(Long id, CategoryRequestDTO categoryRequestDTO, String email) {
        Category categoryExisting = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found with id " + id));
        User user = userRepository.findByEmail(email);

        if (categoryExisting.getUser().getId().equals(user.getId())) {
            CategoryMapper.updateEntity(categoryExisting, categoryRequestDTO);
            categoryRepository.save(categoryExisting);
            return CategoryMapper.toDTO(categoryExisting);
        } else {
            throw new AccessDeniedException("You do not have permission to access this category.");
        }
    }

    public void deleteCategory(Long id, String email) {
        User user = userRepository.findByEmail(email);
        Category category = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found with id " + id));
        if (category.getUser().getId().equals(user.getId())) {
            categoryRepository.deleteById(id);
        } else {
            throw new AccessDeniedException("You do not have permission to access this category.");
        }
    }

     public List<CategoryDTO> listUserCategory(String email) {
       User user = userRepository.findByEmail(email);
       List<Category> categories = user.getCategory();
       return CategoryMapper.toDTOList(categories);
    }
}
