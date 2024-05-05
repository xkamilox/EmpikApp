package org.example.empikserver.controller;

import jakarta.validation.Valid;
import org.example.empikserver.model.Order;
import org.example.empikserver.model.OrderProduct;
import org.example.empikserver.model.Product;
import org.example.empikserver.model.User;
import org.example.empikserver.payload.request.CreateOrderRequest;
import org.example.empikserver.payload.response.OrdersResponse;
import org.example.empikserver.repository.OrderRepository;
import org.example.empikserver.repository.ProductRepository;
import org.example.empikserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @GetMapping("/userorders/{id}")
    public ResponseEntity<List<OrdersResponse>> getUserOrders(@PathVariable("id") Long userId){
        try{
            Optional<User> user = userRepository.findById(userId);

            List<Order> orders = new ArrayList<>();

            orders.addAll(orderRepository.findByUser(user.get()));
            List<OrdersResponse> ordersToSend = new ArrayList<>();
            for(Order order : orders){
                ordersToSend.add(new OrdersResponse(order));
            }

            return new ResponseEntity<>(ordersToSend, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PostMapping("/orders")
    public ResponseEntity<OrdersResponse> createOrder(@Valid @RequestBody CreateOrderRequest createOrderRequest) {
       try {
            Optional<User> user = userRepository.findByUsername(createOrderRequest.getUsername());
            if (!user.isPresent()) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            else {
                Order order = new Order(user.get(), "Order placed", createOrderRequest.getTotalPrice());
                //Stworzenie polaczenia miedzy orderem i produktami
                createOrderRequest.getOrderedItemsIds().forEach(orderedProductId -> {   //iteruje po id zamowoinych produktów
                    Product product = productRepository.findById(orderedProductId).get();
                    if (!order.isProductMultiple(product)) {  //ta metoda sprawdzająca inkrementuje quantity jeśli już jest
                        OrderProduct orderProduct = new OrderProduct();
                        orderProduct.setProduct(product);
                        order.addOrderProduct(orderProduct);
                        orderProduct.setOrder(order);
                    }

                });

                order.setDateOfOrder(new Date());

                Order savedOrder = orderRepository.save(order);
                OrdersResponse orderToReturn = new OrdersResponse(savedOrder);
                return new ResponseEntity<>(orderToReturn, HttpStatus.CREATED);
            }

           } catch(Exception e){
           System.out.println(e.getMessage());
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }

    }

}
