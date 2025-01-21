package com.ensolvers.backend.application.service;

import com.ensolvers.backend.application.dto.NoteRequestDTO;
import com.ensolvers.backend.application.dto.NoteDTO;
import com.ensolvers.backend.application.mapper.NoteMapper;
import com.ensolvers.backend.domain.entity.Category;
import com.ensolvers.backend.domain.entity.Note;
import com.ensolvers.backend.domain.entity.User;
import com.ensolvers.backend.infrastructure.exception.AccessDeniedException;
import com.ensolvers.backend.infrastructure.exception.ResourceNotFoundException;
import com.ensolvers.backend.persistence.repository.CategoryRepository;
import com.ensolvers.backend.persistence.repository.NoteRepository;
import com.ensolvers.backend.persistence.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class NoteService {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public NoteService(NoteRepository noteRepository, UserRepository userRepository, CategoryRepository categoryRepository) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    public NoteDTO getNote(Long id, String email) {
        User user = userRepository.findByEmail(email);
        Note note = noteRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Note not found with id " + id));
        if (!note.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("You do not have permission to access this note.");
        }
        return NoteMapper.toDTO(note);
    }

    public List<NoteDTO> listUserNotes(String email) {
        User user = userRepository.findByEmail(email);
        List<Note> notes = user.getNotes().stream()
                .filter(note -> !note.isArchived())
                .collect(Collectors.toList());
        return NoteMapper.toDTOList(notes);
    }

    public List<NoteDTO> listUserNotesArchived(String email) {
        User user = userRepository.findByEmail(email);
        List<Note> notes = user.getNotes().stream()
                .filter(note -> note.isArchived())
                .collect(Collectors.toList());
        return NoteMapper.toDTOList(notes);
    }

    public NoteDTO createNote(NoteRequestDTO noteRequestDTO, String email) {
        User user = userRepository.findByEmail(email);
        Note note = NoteMapper.toEntity(noteRequestDTO, user);
        if (noteRequestDTO.getCategoryIds() != null && !noteRequestDTO.getCategoryIds().isEmpty()) {
            List<Category> categories = categoryRepository.findAllById(noteRequestDTO.getCategoryIds());
            for (Category category : categories) {
                if (!category.getUser().getId().equals(user.getId())) {
                    throw new AccessDeniedException("You do not have permission to use category with id " + category.getId());
                }
            }
            note.getCategory().addAll(categories);
        }
        noteRepository.save(note);
        return NoteMapper.toDTO(note);
    }

    public NoteDTO updateNote(Long id, NoteRequestDTO noteRequestDTO, String email) {
        Note existingNote = noteRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Note not found with id " + id));
        User user = userRepository.findByEmail(email);
        if (!existingNote.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("You do not have permission to access this note.");
        }

        existingNote.setTitle(noteRequestDTO.getTitle());
        existingNote.setContent(noteRequestDTO.getContent());
        existingNote.setColor(noteRequestDTO.getColor());

        if (noteRequestDTO.getCategoryIds() != null && !noteRequestDTO.getCategoryIds().isEmpty()) {
            List<Category> existingCategories = new ArrayList<>(existingNote.getCategory());
            List<Category> requestCategories = categoryRepository.findAllById(noteRequestDTO.getCategoryIds());
            for (Category category : requestCategories) {
                if (!category.getUser().getId().equals(user.getId())) {
                    throw new AccessDeniedException("You do not have permission to use category with id " + category.getId());
                }
            }

            List<Category> categoriesToAdd = requestCategories.stream()
                    .filter(cat -> !existingCategories.contains(cat))
                    .toList();

            List<Category> categoriesToRemove = existingCategories.stream()
                    .filter(cat -> !requestCategories.contains(cat))
                    .toList();

            existingNote.getCategory().removeAll(categoriesToRemove);
            existingNote.getCategory().addAll(categoriesToAdd);
        }
        noteRepository.save(existingNote);
        return NoteMapper.toDTO(existingNote);
    }

    public void toggleArchiveNote(Long id, String email) {
        Note note = noteRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Note not found with id " + id));
        User user = userRepository.findByEmail(email);
        if (!note.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("You do not have permission to access this note.");
        }
        note.setArchived(!note.isArchived());
        noteRepository.save(note);
    }

    public void deleteNote(Long id, String email) {
        User user = userRepository.findByEmail(email);
        Note note = noteRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Note not found with id " + id));
        if (!note.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("You do not have permission to access this note.");
        }
        noteRepository.deleteById(id);

    }

}
