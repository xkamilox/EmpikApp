package org.example.empikserver;


import org.example.empikserver.controller.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class ControllersTests {

    @Autowired
    private AuthController authController;

    @Autowired
    private BasketController basketController;

    @Autowired
    private FavoritesController favoritesController;

    @Autowired
    private OrderController orderController;

    @Autowired
    private PaymentController paymentController;

    @Autowired
    private ProductController productController;

    @Autowired
    private UserController userController;



    @Test
    void authControllerisCreated() throws Exception {
        assertThat(authController).isNotNull();
    }

    @Test
    void basketControllerisCreated() throws Exception {
        assertThat(basketController).isNotNull();
    }

    @Test
    void favoritesControllerisCreated() throws Exception {
        assertThat(favoritesController).isNotNull();
    }


    @Test
    void orderControllerisCreated() throws Exception {
        assertThat(orderController).isNotNull();
    }

    @Test
    void paymentControllerisCreated() throws Exception {
        assertThat(paymentController).isNotNull();
    }

    @Test
    void productControllerisCreated() throws Exception {
        assertThat(productController).isNotNull();
    }

    @Test
    void userControllerisCreated() throws Exception {
        assertThat(userController).isNotNull();
    }

}
