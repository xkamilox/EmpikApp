package org.example.empikserver.payload.response;

import org.example.empikserver.model.Basket;

import java.util.HashMap;
import java.util.Map;

public class BasketResponse {

    /*Map<Long, Integer> items = new HashMap<>();


    public void addItem(Basket basket) {
        items.put(basket.getId(), basket.getCount());
    }*/

    private Long product_id;

    private int count;

    public BasketResponse(){}

    public BasketResponse(Basket basket) {
        this.product_id = basket.getProduct().getId();
        this.count = basket.getCount();
    }

    public Long getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Long product_id) {
        this.product_id = product_id;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }




    /*public Map<Long, Integer> getItems() {
        return items;
    }

    public void setItems(Map<Long, Integer> items) {
        this.items = items;
    }*/




}
