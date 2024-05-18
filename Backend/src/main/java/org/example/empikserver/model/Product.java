package org.example.empikserver.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="products")
public class Product {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column(scale=2)
    private BigDecimal price;

    @Column
    private String producer;

    @Column
    private String description;

    @Column
    private int recommendedAge;

    @Column
    private String recommendedSex;

    @Column
    private String material;

    @Column
    private Integer heightInMilimeters;

    @Column
    private Integer widthInMilimeters;

    @Column
    private Integer depthInMilimeters;

    @Column
    private Integer weightInGrams;

    @Column
    private boolean isAvailable;

    @OneToMany(mappedBy = "product")
    private Set<Basket> basket = new HashSet<Basket>();


    public Set<Basket> getBasket() {
        return basket;
    }



    public Product(){

    }

    public Product(String name, BigDecimal price, String producer, String description, int recommendedAge, String recommendedSex, String material,
                   Integer heightInMilimeters, Integer widthInMilimeters, Integer depthInMilimeters, Integer weightInGrams, boolean isAvailable) {
        this.name = name;
        this.price = price;
        this.producer = producer;
        this.description = description;
        this.recommendedAge = recommendedAge;
        this.recommendedSex = recommendedSex;
        this.material = material;
        this.heightInMilimeters = heightInMilimeters;
        this.widthInMilimeters = widthInMilimeters;
        this.depthInMilimeters = depthInMilimeters;
        this.weightInGrams = weightInGrams;
        this.isAvailable = isAvailable;
    }

    public Product(Product product, boolean isAvailable){
        this.name = product.getName();
        this.price = product.getPrice();
        this.producer = product.getProducer();
        this.description = product.getDescription();
        this.recommendedAge = product.getRecommendedAge();
        this.recommendedSex = product.getRecommendedSex();
        this.material = product.getMaterial();
        this.heightInMilimeters = product.getHeightInMilimeters();
        this.widthInMilimeters = product.getWidthInMilimeters();
        this.depthInMilimeters = product.getDepthInMilimeters();
        this.weightInGrams = product.getWeightInGrams();
        this.isAvailable = isAvailable;
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

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getProducer() {
        return producer;
    }

    public void setProducer(String producer) {
        this.producer = producer;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getRecommendedAge() {
        return recommendedAge;
    }

    public void setRecommendedAge(int recommendedAge) {
        this.recommendedAge = recommendedAge;
    }

    public String getRecommendedSex() {
        return recommendedSex;
    }

    public void setRecommendedSex(String recommendedSex) {
        this.recommendedSex = recommendedSex;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public Integer getHeightInMilimeters() {
        return heightInMilimeters;
    }

    public void setHeightInMilimeters(Integer heightInMilimeters) {
        this.heightInMilimeters = heightInMilimeters;
    }

    public Integer getWidthInMilimeters() {
        return widthInMilimeters;
    }

    public void setWidthInMilimeters(Integer widthInMilimeters) {
        this.widthInMilimeters = widthInMilimeters;
    }

    public Integer getDepthInMilimeters() {
        return depthInMilimeters;
    }

    public void setDepthInMilimeters(Integer depthInMilimeters) {
        this.depthInMilimeters = depthInMilimeters;
    }

    public Integer getWeightInGrams() {
        return weightInGrams;
    }

    public void setWeightInGrams(Integer weightInGrams) {
        this.weightInGrams = weightInGrams;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }


    public void setBasket(Set<Basket> basket) {
        this.basket = basket;
    }
}
