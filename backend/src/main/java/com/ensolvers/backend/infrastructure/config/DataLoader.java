package com.ensolvers.backend.infrastructure.config;

import com.ensolvers.backend.domain.entity.User;
import com.ensolvers.backend.persistence.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataLoader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User adminUser = new User();
            adminUser.setName("Admin");
            adminUser.setEmail("admin@example.com");
            adminUser.setPassword("$2a$10$Heu21Q5LkL.Kn6mbtKqvkuzqBSSZVUbR5ZmumUysJoMEXz2PydXAm");

            userRepository.save(adminUser);
            System.out.println("Usuario Admin insertado");
        }
    }
}
