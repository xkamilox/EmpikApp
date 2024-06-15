package org.example.empikserver.payload.response;

import org.example.empikserver.model.Product;

import java.math.BigDecimal;

public class FavoriteProductResponse {

    private Long id;
    private String name;
    private String producer;
    private BigDecimal price;
    private boolean is_available;
    private String variant;


    public FavoriteProductResponse(Product product){
        this.id = product.getId();
        this.name = product.getName();
        this.producer = product.getProducer();
        this.price = product.getPrice();
        this.is_available = product.isAvailable();
        this.variant = product.getVariant();
    }

    public FavoriteProductResponse() {
    }

    public FavoriteProductResponse(String name, String producer, BigDecimal price, boolean is_available, String variant) {
        this.name = name;
        this.producer = producer;
        this.price = price;
        this.is_available = is_available;
        this.variant = variant;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProducer() {
        return producer;
    }

    public void setProducer(String producer) {
        this.producer = producer;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public boolean isIs_available() {
        return is_available;
    }

    public void setIs_available(boolean is_available) {
        this.is_available = is_available;
    }

    public String getVariant() {
        return variant;
    }

    public void setVariant(String variant) {
        this.variant = variant;
    }

}
