package org.example.empikserver.controller;

import org.example.empikserver.payload.response.CompletedOrder;
import org.example.empikserver.payload.response.PaymentOrder;
import org.example.empikserver.service.PaypalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api")
public class PaymentController {

    @Autowired
    PaypalService paypalService;


    @PostMapping("/paypal/init")
    public PaymentOrder createPayment(@RequestParam BigDecimal sum) {
        return paypalService.createPayment(sum);
    }

    @PostMapping("/paypal/capture")
    public CompletedOrder completePayment(@RequestParam(name = "token") String token, @RequestParam(name = "placedOrderId") Long placedOrderId) {
        return paypalService.completePayment(token, placedOrderId);
    }


}
