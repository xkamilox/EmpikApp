package org.example.empikserver.controller;

import org.example.empikserver.model.Favorite;
import org.example.empikserver.model.Product;
import org.example.empikserver.model.User;
import org.example.empikserver.payload.response.FavoriteProductResponse;
import org.example.empikserver.repository.FavoriteRepository;
import org.example.empikserver.repository.ProductRepository;
import org.example.empikserver.repository.UserRepository;
import org.example.empikserver.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api")
public class FavoritesController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    FavoriteRepository favoriteRepository;

    @Autowired
    ProductRepository productRepository;


    @GetMapping("/favorites")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity< List<FavoriteProductResponse> > getFavorites() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); //pobrany jest user z securitycontext i z niego pobiera się id usera
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Long userId = userDetails.getId();
            User user = userRepository.findById(userId).get();

            List<Favorite> favorites = favoriteRepository.findAllByUser(user);
            List<FavoriteProductResponse> favoriteProducts = new ArrayList<>();

            favorites.forEach(favorite -> {
                favoriteProducts.add(new FavoriteProductResponse(favorite.getProduct()) );

            });


            return new ResponseEntity<>(favoriteProducts, HttpStatus.OK);



        }catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    @DeleteMapping("/favorites")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> removeFromFavorites(@RequestParam Long productId){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); //pobrany jest user z securitycontext i z niego pobiera się id usera
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Long userId = userDetails.getId();


            Optional<Favorite> favoriteToDelete = favoriteRepository.findByUserIdAndProductId(userId, productId);
            favoriteRepository.delete(favoriteToDelete.get());

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        }catch(NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    @PostMapping("/favorites")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addToFavorites(@RequestParam Long productId){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); //pobrany jest user z securitycontext i z niego pobiera się id usera
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Long userId = userDetails.getId();
            User user = userRepository.findById(userId).get();

            List<Favorite> favorites = favoriteRepository.findAllByUser(user);

            boolean isInFavorites = false;

            for(Favorite favorite : favorites){
                if(favorite.getProduct().getId().equals(productId)){
                    isInFavorites = true;
                    break;
                }
            }

            if(!isInFavorites){
                Product newFavProduct = productRepository.findById(productId).get();
                Favorite favToSave = new Favorite(user, newFavProduct);
                favoriteRepository.save(favToSave);
            }

            return new ResponseEntity<>(HttpStatus.OK);

        }catch(NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
