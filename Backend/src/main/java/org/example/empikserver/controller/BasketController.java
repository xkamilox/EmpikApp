package org.example.empikserver.controller;

import org.example.empikserver.model.Basket;
import org.example.empikserver.model.Product;
import org.example.empikserver.model.User;
import org.example.empikserver.payload.request.BasketRequest;
import org.example.empikserver.payload.response.BasketResponse;
import org.example.empikserver.repository.BasketRepository;
import org.example.empikserver.repository.ProductRepository;
import org.example.empikserver.repository.UserRepository;
import org.example.empikserver.security.services.UserDetailsImpl;
import org.example.empikserver.service.BasketService;
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
public class BasketController {

    @Autowired
    BasketRepository basketRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    BasketService basketService;


    @GetMapping("/basket")
    //@PreAuthorize("(hasRole('USER') and #userid == authentication.principal.id) or hasRole('ADMIN')")
    public ResponseEntity< List<BasketResponse> > getUserBasket(/*@RequestParam Long userid*/) {
        try {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); //pobrany jest user z securitycontext i z niego pobiera się id usera
                UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();          //by potem pobrać jego koszyk
                Long userId = userDetails.getId();
                User user = userRepository.findById(userId).get();


                List<Basket> basket = basketRepository.findByUser(user);
                List<BasketResponse> basketResponse = new ArrayList<>();
                basket.forEach(bask -> {
                    basketResponse.add(new BasketResponse(bask));
                });

                return new ResponseEntity<>(basketResponse, HttpStatus.OK);


        }catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/basket")
    public ResponseEntity< List<BasketResponse> > getUserBasket(@RequestBody BasketRequest basketRequest) {
        List<BasketResponse> basketResponse = new ArrayList<>();
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); //pobrany jest user z securitycontext i z niego pobiera się id usera
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();          //by potem pobrać jego koszyk
            Long userId = userDetails.getId();
            User user = userRepository.findById(userId).get();

            if (basketRequest.getOperationName().equals("AddOrRemoveFromBasket")) {
                List<Basket> basketList = basketRepository.findByUser(user);
                Long productId = basketRequest.getProductId();
                int quantityDiff = basketRequest.getCount();


                if (!basketService.changeQuantityIfPresent(productId, basketList, quantityDiff)) { //sprawdza czy jest juz o basket z produktem o takim id,
                    Basket newBasket = basketService.createNewBasket(user, productId);       //jesli tak to inkrementuje/dekrementuje count, zwraca false jeśli nie bylo
                    basketRepository.save(newBasket);
                    basketList.add(newBasket);
                }

                List<Basket> updatedBasketList = basketRepository.findByUser(user);
                updatedBasketList.forEach(bask -> {
                    basketResponse.add(new BasketResponse(bask));
                });

                return new ResponseEntity<>(basketResponse, HttpStatus.OK);
            }
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(basketResponse, HttpStatus.OK);
    }
}
