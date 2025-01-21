package com.ensolvers.backend.presentation.controller;

import com.ensolvers.backend.application.dto.NoteRequestDTO;
import com.ensolvers.backend.application.dto.NoteDTO;
import com.ensolvers.backend.application.service.NoteService;
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
@RequestMapping("/api/note")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class NoteController {

    private final NoteService noteService;
    private final JwtTokenProvider jwtTokenProvider;

    public NoteController(NoteService noteService, JwtTokenProvider jwtTokenProvider) {
        this.noteService = noteService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getNote(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id) {

        String userEmail = jwtTokenProvider.getUser(token);
        NoteDTO noteDTO = noteService.getNote(id, userEmail);
        if (noteDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(noteDTO);
    }

    @GetMapping
    public ResponseEntity<List<NoteDTO>> listUserNotes(
            @RequestHeader("Authorization") String token) {

        String userEmail = jwtTokenProvider.getUser(token);
        List<NoteDTO> noteDTO = noteService.listUserNotes(userEmail);
        return ResponseEntity.ok(noteDTO);
    }

    @GetMapping("/archived")
    public ResponseEntity<List<NoteDTO>> listUserNotesArchived(
            @RequestHeader("Authorization") String token) {

        String userEmail = jwtTokenProvider.getUser(token);
        List<NoteDTO> noteDTO = noteService.listUserNotesArchived(userEmail);
        return ResponseEntity.ok(noteDTO);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createNote(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody NoteRequestDTO noteRequestDTO) {

        String userEmail = jwtTokenProvider.getUser(token);
        NoteDTO noteDTO = noteService.createNote(noteRequestDTO, userEmail);
        return ResponseEntity.ok(noteDTO);
    }

    
    @PutMapping("/archive/{id}")
    public ResponseEntity<?> toggleArchiveNote(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id) {

        String userEmail = jwtTokenProvider.getUser(token);
        noteService.toggleArchiveNote(id, userEmail);
        return ResponseEntity.noContent().build(); 
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateNote(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id,
            @Valid @RequestBody NoteRequestDTO noteRequestDTO) {

        String userEmail = jwtTokenProvider.getUser(token);
        NoteDTO noteDTO = noteService.updateNote(id, noteRequestDTO, userEmail);
        return ResponseEntity.ok(noteDTO);
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNote(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id) {

        String userEmail = jwtTokenProvider.getUser(token);
        noteService.deleteNote(id, userEmail);
        return ResponseEntity.ok().body("Note deleted successfully");
    }

}
