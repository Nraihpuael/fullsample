package com.ensolvers.backend.persistence.repository;

import com.ensolvers.backend.domain.entity.Note;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

}
