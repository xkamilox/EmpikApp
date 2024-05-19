package org.example.empikserver.repository;

import org.example.empikserver.model.Basket;
import org.example.empikserver.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BasketRepository extends JpaRepository<Basket, Long> {

    List<Basket> findByUser(User user);


}
