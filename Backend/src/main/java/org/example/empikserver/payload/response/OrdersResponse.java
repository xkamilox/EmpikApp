package org.example.empikserver.payload.response;

import org.example.empikserver.model.Order;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Map;


public class OrdersResponse {

    private Long id;
    private String status;
    private Date dateOfOrder;
    private BigDecimal totalPrice;
    private Map<Long, Integer> idsAndCountMap;

    public OrdersResponse(Order order){
        id = order.getId();
        status = order.getStatus();
        dateOfOrder = order.getDateOfOrder();
        totalPrice = order.getTotalPrice();
        idsAndCountMap = order.getItemsIdsAndCount();
    }

    public OrdersResponse() {
    }

    public OrdersResponse(Long id, String status, Date dateOfOrder, BigDecimal totalPrice) {
        this.id = id;
        this.status = status;
        this.dateOfOrder = dateOfOrder;
        this.totalPrice = totalPrice;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDateOfOrder() {
        return dateOfOrder;
    }

    public void setDateOfOrder(Date dateOfOrder) {
        this.dateOfOrder = dateOfOrder;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Map<Long, Integer> getIdsAndCountMap() {
        return idsAndCountMap;
    }

    public void setIdsAndCountMap(Map<Long, Integer> idsAndCountMap) {
        this.idsAndCountMap = idsAndCountMap;
    }
}
