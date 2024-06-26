package org.example.empikserver.repository;

import org.example.empikserver.model.Favorite;
import org.example.empikserver.model.Order;
import org.example.empikserver.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findAllByUser(User user);

    Optional<Favorite> findByUserIdAndProductId(Long userId, Long productId);
}
