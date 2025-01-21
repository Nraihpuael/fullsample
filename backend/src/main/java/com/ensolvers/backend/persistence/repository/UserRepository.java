package com.ensolvers.backend.persistence.repository;

import com.ensolvers.backend.domain.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{
        User findByEmail(String email);

}
