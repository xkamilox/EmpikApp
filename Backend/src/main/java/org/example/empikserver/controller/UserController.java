package org.example.empikserver.controller;

import org.example.empikserver.model.Basket;
import org.example.empikserver.model.Favorite;
import org.example.empikserver.model.Product;
import org.example.empikserver.model.User;
import org.example.empikserver.payload.response.BasketResponse;
import org.example.empikserver.payload.response.FavoriteProductResponse;
import org.example.empikserver.payload.response.UserResponse;
import org.example.empikserver.repository.FavoriteRepository;
import org.example.empikserver.repository.UserRepository;
import org.example.empikserver.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    FavoriteRepository favoriteRepository;

    @Autowired
    PasswordEncoder encoder;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        try{
            List<User> users = new ArrayList<>();

            users.addAll(userRepository.findAll());

            if(users.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(users, HttpStatus.OK);

        } catch(Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/users/{id}")
    @PreAuthorize("(hasRole('USER') and #id == authentication.principal.id) or hasRole('ADMIN')")
    public ResponseEntity<UserResponse> getUserById(@PathVariable("id") long id) {
        Optional<User> user = userRepository.findById(id);

        if(user.isPresent()){
            UserResponse userResponse = new UserResponse(user.get());
            return new ResponseEntity<>(userResponse, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //@GetMapping("/users/")


    @PutMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> updateUser(@PathVariable("id") long id,
                                           @RequestBody User user) {

        Optional<User> us = userRepository.findById(id);

        if(us.isPresent()){
            User updatedUser = us.get();
            updatedUser.setName(user.getName());
            updatedUser.setSurname(user.getSurname());
            updatedUser.setUsername(user.getUsername());
            updatedUser.setEmail(user.getEmail());
            updatedUser.setPassword(encoder.encode(user.getPassword()));
            return new ResponseEntity<>(userRepository.save(updatedUser), HttpStatus.OK);

        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") long id) {
        try{
            userRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
