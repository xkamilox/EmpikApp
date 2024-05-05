package org.example.empikserver.repository;

import org.example.empikserver.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByNameContaining(String name);

    Optional<Product> findById(Long productId);

}
