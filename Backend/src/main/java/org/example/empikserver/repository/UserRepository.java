package org.example.empikserver.repository;

import org.example.empikserver.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    //Optional<User> findById(Long userId);
    Optional<User> findAllById(Long userId);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
