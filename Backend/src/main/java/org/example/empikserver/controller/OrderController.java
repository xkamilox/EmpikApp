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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.*;

@CrossOrigin(origins="*", methods = {RequestMethod.PUT,RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PATCH})
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
    @PreAuthorize("(hasRole('USER') and #userId == authentication.principal.id) or hasRole('ADMIN')")
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
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<OrdersResponse> createOrder(@Valid @RequestBody CreateOrderRequest createOrderRequest) {
       try {
           Order order;
            if(createOrderRequest.getUserId() != null) {    //Jest userId w requescie - zalogowany
                Optional<User> user = userRepository.findById(createOrderRequest.getUserId());

               if (!user.isPresent()) {     //Nie ma usera o takim userId - zwraca 404
                   return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

               }else{   //User o takim userId istnieje - tworzony jest obiekt Order z jego id
                   order = new Order(user.get(), "Waiting for payment", createOrderRequest.getTotalPrice(), createOrderRequest.getDeliveryAddress(),
                           createOrderRequest.getName(), createOrderRequest.getSurname(), createOrderRequest.getEmail());
               }

            } else {    //userId w requescie==null - niezalogowany
                order = new Order(null, "Waiting for payment", createOrderRequest.getTotalPrice(), createOrderRequest.getDeliveryAddress(),
                        createOrderRequest.getName(), createOrderRequest.getSurname(), createOrderRequest.getEmail());
            }

                   //Stworzenie polaczenia miedzy orderem i produktami
                   createOrderRequest.getOrderedItemsIds().forEach(orderedProductId -> {   //iteruje po id zamowionych produktów
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


           } catch(Exception e){
           System.out.println(e.getMessage());
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }

    }

    @GetMapping("/admin/orders")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity< List<OrdersResponse> > getAllOrders(@RequestParam(name = "page") int page, @RequestParam(name= "pageSize") int pageSize) {

        PageRequest pageRequest = PageRequest.of(page - 1,
                pageSize,
                Sort.by(Sort.Direction.DESC, "dateOfOrder"));

        List<Order> orders = orderRepository.findAll(pageRequest).getContent();

        List<OrdersResponse> ordersToSend = new ArrayList<>();
        for(Order order : orders){
            ordersToSend.add(new OrdersResponse(order));
        }
        return new ResponseEntity<>(ordersToSend, HttpStatus.OK);
    }


    @PatchMapping("/orders")
    public ResponseEntity<HttpStatus> updateOrderStatus(@RequestParam(name = "orderId") Long orderId, @RequestParam(name= "newStatus") String newStatus) {
        try {
            Order orderToUpdate = orderRepository.findById(orderId).get();

            orderToUpdate.setStatus(newStatus);

            orderRepository.save(orderToUpdate);
            return new ResponseEntity<>(HttpStatus.OK);

        }catch(NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
