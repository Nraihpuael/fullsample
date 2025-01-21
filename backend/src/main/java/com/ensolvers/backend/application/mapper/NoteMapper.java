package com.ensolvers.backend.application.mapper;

import com.ensolvers.backend.application.dto.NoteRequestDTO;
import com.ensolvers.backend.application.dto.NoteDTO;
import com.ensolvers.backend.domain.entity.Note;
import com.ensolvers.backend.domain.entity.User;
import java.util.List;
import java.util.stream.Collectors;

public class NoteMapper {

    public static Note toEntity(NoteRequestDTO noteRequestDTO, User user) {
        if (noteRequestDTO == null) {
            return null;
        }
        Note note = new Note();
        note.setTitle(noteRequestDTO.getTitle());
        note.setContent(noteRequestDTO.getContent());
        note.setColor(noteRequestDTO.getColor());
        note.setArchived(false);
        note.setUser(user);
        return note;
    }

    public static NoteDTO toDTO(Note note) {
        if (note == null) {
            return null;
        }
        NoteDTO noteDTO = new NoteDTO();
        noteDTO.setId(note.getId());
        noteDTO.setTitle(note.getTitle());
        noteDTO.setContent(note.getContent());
        noteDTO.setColor(note.getColor());
        noteDTO.setCategories(
                note.getCategory().stream()
                        .map(CategoryMapper::toDTO)
                        .collect(Collectors.toList())
        );
        return noteDTO;
    }

    public static List<NoteDTO> toDTOList(List<Note> notes) {
        return notes.stream().map(NoteMapper::toDTO).collect(Collectors.toList());
    }

}
