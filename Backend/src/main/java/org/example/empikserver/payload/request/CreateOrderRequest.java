package org.example.empikserver.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.math.BigDecimal;
import java.util.List;

public class CreateOrderRequest {
    @NotBlank
    private String username;

    @NotEmpty
    private List<Long> orderedItemsIds;

    private BigDecimal totalPrice;

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String userId) {
        this.username = userId;
    }

    public List<Long> getOrderedItemsIds() {
        return orderedItemsIds;
    }

    public void setOrderedItemsIds(List<Long> orderedItemsIds) {
        this.orderedItemsIds = orderedItemsIds;
    }
}
