package org.example.empikserver;

import org.example.empikserver.controller.FavoritesController;
import org.example.empikserver.model.Favorite;
import org.example.empikserver.model.Product;
import org.example.empikserver.model.User;
import org.example.empikserver.payload.response.FavoriteProductResponse;
import org.example.empikserver.repository.FavoriteRepository;
import org.example.empikserver.repository.ProductRepository;
import org.example.empikserver.repository.UserRepository;
import org.example.empikserver.security.services.UserDetailsImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class FavoritesControllerTest {

    @InjectMocks
    private FavoritesController favoritesController;

    @Mock
    private UserRepository userRepository;

    @Mock
    private FavoriteRepository favoriteRepository;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    @Mock
    private UserDetailsImpl userDetails;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(userDetails.getId()).thenReturn(1L);
    }

    @Test
    public void testGetFavorites() {
        User user = new User();
        user.setId(1L);

        Favorite favorite = new Favorite();
        favorite.setProduct(new Product());

        List<Favorite> favorites = new ArrayList<>();
        favorites.add(favorite);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(favoriteRepository.findAllByUser(user)).thenReturn(favorites);

        ResponseEntity<List<FavoriteProductResponse>> response = favoritesController.getFavorites();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
    }

    @Test
    public void testRemoveFromFavorites() {
        User user = new User();
        user.setId(1L);

        Favorite favorite = new Favorite();
        favorite.setProduct(new Product());
        favorite.setUser(user);

        when(favoriteRepository.findByUserIdAndProductId(1L, 1L)).thenReturn(Optional.of(favorite));

        ResponseEntity<?> response = favoritesController.removeFromFavorites(1L);

        verify(favoriteRepository, times(1)).delete(favorite);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

    @Test
    public void testRemoveFromFavorites_NotFound() {
        when(favoriteRepository.findByUserIdAndProductId(1L, 1L)).thenReturn(Optional.empty());

        ResponseEntity<?> response = favoritesController.removeFromFavorites(1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void testAddToFavorites() {
        User user = new User();
        user.setId(1L);

        Product product = new Product();
        product.setId(1L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(favoriteRepository.findAllByUser(user)).thenReturn(new ArrayList<>());
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        ResponseEntity<?> response = favoritesController.addToFavorites(1L);

        verify(favoriteRepository, times(1)).save(any(Favorite.class));
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testAddToFavorites_AlreadyExists() {
        User user = new User();
        user.setId(1L);

        Product product = new Product();
        product.setId(1L);

        Favorite favorite = new Favorite(user, product);

        List<Favorite> favorites = new ArrayList<>();
        favorites.add(favorite);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(favoriteRepository.findAllByUser(user)).thenReturn(favorites);

        ResponseEntity<?> response = favoritesController.addToFavorites(1L);

        verify(favoriteRepository, times(0)).save(any(Favorite.class));
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
}
