package org.example.empikserver.payload.response;


import org.example.empikserver.model.Order;

public class CompletedOrder {
    private String status;
    private String payId;
    private OrdersResponse orderToShow;

    public CompletedOrder(String status, String payId, Order orderToShow) {
        this.status = status;
        this.payId = payId;
        this.orderToShow = new OrdersResponse(orderToShow);
    }

    public CompletedOrder() {
    }

    public CompletedOrder(String status) {
        this.status = status;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPayId() {
        return payId;
    }

    public void setPayId(String payId) {
        this.payId = payId;
    }

    public OrdersResponse getOrderToShow() {
        return orderToShow;
    }

    public void setOrderToShow(Order orderToShow) {
        this.orderToShow = new OrdersResponse(orderToShow);
    }


}
