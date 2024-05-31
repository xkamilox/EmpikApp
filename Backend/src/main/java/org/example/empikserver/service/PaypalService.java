package org.example.empikserver.service;

import com.paypal.core.PayPalHttpClient;
import com.paypal.orders.*;
import com.paypal.http.*;
import org.example.empikserver.payload.response.CompletedOrder;
import org.example.empikserver.payload.response.PaymentOrder;
import org.example.empikserver.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class PaypalService {

    @Autowired
    private PayPalHttpClient payPalHttpClient;

    @Autowired
    private OrderRepository orderRepository;


    public PaymentOrder createPayment(BigDecimal fee) {
        OrderRequest orderRequest = new OrderRequest();
        orderRequest.checkoutPaymentIntent("CAPTURE");

        AmountWithBreakdown amountBreakdown =
                new AmountWithBreakdown().currencyCode("PLN").value(fee.toString());


        PurchaseUnitRequest purchaseUnitRequest =
                new PurchaseUnitRequest().amountWithBreakdown(amountBreakdown);

        orderRequest.purchaseUnits(List.of(purchaseUnitRequest));


        ApplicationContext applicationContext =
                new ApplicationContext()
                        .returnUrl("http://localhost:5173/capture")
                        .cancelUrl("http://localhost:5173/cancel");

        orderRequest.applicationContext(applicationContext);


        OrdersCreateRequest ordersCreateRequest =
                new OrdersCreateRequest().requestBody(orderRequest);

        try{
            HttpResponse<Order> orderHttpResponse = payPalHttpClient.execute(ordersCreateRequest);
            Order order =  orderHttpResponse.result();

            String redirectUrl = order.links().stream()
                    .filter(link -> "approve".equals(link.rel()))
                    .findFirst()
                    .orElseThrow(NoSuchElementException::new)
                    .href();

            return new PaymentOrder("success", order.id(), redirectUrl);

        }catch (Exception e){
            System.out.println(e.getMessage());
            return new PaymentOrder("Error");
        }
    }


    public CompletedOrder completePayment(String token, Long placedOrderId) {
        OrdersCaptureRequest ordersCaptureRequest =
                new OrdersCaptureRequest(token);

        try{
            HttpResponse<Order> httpResponse = payPalHttpClient.execute(ordersCaptureRequest);

            if(httpResponse.result().status() != null) {

                org.example.empikserver.model.Order orderToUpdate = orderRepository.findById(placedOrderId).get();  //zupdatowanie statusu zamówienia do "paid"
                orderToUpdate.setStatus("Paid");
                orderRepository.save(orderToUpdate);

                return new CompletedOrder("success", token, orderToUpdate);
            }
        } catch (Exception e) {
            return new CompletedOrder("error");
        }
        return new CompletedOrder("error");
    }

}
