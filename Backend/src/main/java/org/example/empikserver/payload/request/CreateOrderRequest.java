package org.example.empikserver.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.math.BigDecimal;
import java.util.List;

public class CreateOrderRequest {

    private Long userId;

    @NotBlank
    private String email;

    @NotBlank
    private String name;

    @NotBlank
    private String surname;

    @NotEmpty
    private List<Long> orderedItemsIds;

    private BigDecimal totalPrice;

    private String deliveryAddress;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }


    public List<Long> getOrderedItemsIds() {
        return orderedItemsIds;
    }

    public void setOrderedItemsIds(List<Long> orderedItemsIds) {
        this.orderedItemsIds = orderedItemsIds;
    }
}
