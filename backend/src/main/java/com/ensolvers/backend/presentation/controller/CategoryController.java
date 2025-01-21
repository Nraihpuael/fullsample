package com.ensolvers.backend.presentation.controller;

import com.ensolvers.backend.application.dto.CategoryDTO;
import com.ensolvers.backend.application.dto.CategoryRequestDTO;
import com.ensolvers.backend.application.service.CategoryService;
import com.ensolvers.backend.infrastructure.security.JwtTokenProvider;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/category")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CategoryController {

    private final CategoryService categoryService;
    private final JwtTokenProvider jwtTokenProvider;

    public CategoryController(CategoryService categoryService, JwtTokenProvider jwtTokenProvider) {
        this.categoryService = categoryService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategory(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id) {

        String userEmail = jwtTokenProvider.getUser(token);
        CategoryDTO categoryDTO = categoryService.getCategory(id, userEmail);
        if (categoryDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(categoryDTO);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCategory(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody CategoryRequestDTO categoryRequestDTO) {

        String userEmail = jwtTokenProvider.getUser(token);
        CategoryDTO categoryDTO = categoryService.createCategory(categoryRequestDTO, userEmail);
        return ResponseEntity.ok(categoryDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id,
            @Valid @RequestBody CategoryRequestDTO categoryRequestDTO) {

        String userEmail = jwtTokenProvider.getUser(token);
        CategoryDTO categoryDTO = categoryService.updateCategory(id, categoryRequestDTO, userEmail);
        if (categoryDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(categoryDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id) {
        String userEmail = jwtTokenProvider.getUser(token);
        categoryService.deleteCategory(id, userEmail);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping
    public ResponseEntity<List<CategoryDTO>> listUserCategory(
            @RequestHeader("Authorization") String token) {
        String userEmail = jwtTokenProvider.getUser(token);
        List<CategoryDTO> categoryDTO = categoryService.listUserCategory(userEmail);
        return ResponseEntity.ok(categoryDTO);
    }
    
    
}
