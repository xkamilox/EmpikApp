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
    private Long userid;
    private String deliveryAddress;
    private String ordererEmail;
    private String ordererName;
    private String orderedSurname;

    public OrdersResponse(Order order){
        id = order.getId();
        status = order.getStatus();
        dateOfOrder = order.getDateOfOrder();
        totalPrice = order.getTotalPrice();
        idsAndCountMap = order.getItemsIdsAndCount();
        if(order.getUser()!=null) {
            userid = order.getUser().getId();
        }else {
            userid= 0L;
        }
        deliveryAddress = order.getDeliveryAddress();
        ordererEmail = order.getEmail();
        ordererName = order.getName();
        orderedSurname = order.getSurname();
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

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public String getOrdererEmail() {
        return ordererEmail;
    }

    public void setOrdererEmail(String ordererEmail) {
        this.ordererEmail = ordererEmail;
    }

    public String getOrdererName() {
        return ordererName;
    }

    public void setOrdererName(String ordererName) {
        this.ordererName = ordererName;
    }

    public String getOrderedSurname() {
        return orderedSurname;
    }

    public void setOrderedSurname(String orderedSurname) {
        this.orderedSurname = orderedSurname;
    }

}
