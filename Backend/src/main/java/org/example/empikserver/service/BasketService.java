package org.example.empikserver.service;

import org.example.empikserver.model.Basket;
import org.example.empikserver.model.Product;
import org.example.empikserver.model.User;
import org.example.empikserver.repository.BasketRepository;
import org.example.empikserver.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BasketService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    BasketRepository basketRepository;


    public Basket createNewBasket(User user, Long productId) throws NoSuchElementException {
        Basket newBasket = new Basket();
        newBasket.setUser(user);
        newBasket.setCount(1);
        Product product = productRepository.findById(productId).get();
        newBasket.setProduct(product);

        return newBasket;
    }

    //sprawdza czy jest juz o basket z produktem o takim id, jesli tak to inkrementuje/dekrementuje count, zwraca false jeśli nie bylo
    public boolean changeQuantityIfPresent(Long productId, List<Basket> basketList, int quantityDiff) {
        for (Basket bask : basketList) {
            if (bask.getProduct().getId().equals(productId)) { // produkt o takim id juz jest w koszyku
                if (quantityDiff == -1) { //Ma być zmniejszenie count
                    if (bask.decrementCount() == 0) { //jeśli przy dekrementacji count zmniejszy sie do zera to usuwa basket z bazy
                        basketRepository.delete(bask);
                    } else {
                        basketRepository.save(bask);
                    }
                } else { //zwiększa
                    bask.incrementCount();
                    basketRepository.save(bask);
                }

                return true; //zmieniono ilosc
            }
        }
        return false;
    }

}
