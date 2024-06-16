package org.example.empikserver.model;

import jakarta.persistence.*;
import org.example.empikserver.payload.request.ProductRequest;
import org.hibernate.annotations.Type;

import java.math.BigDecimal;
import java.sql.Blob;
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

    @Column
    private String variant;

    @Column
    private String Category;

    @Lob
    @Column /*(columnDefinition = "BYTEA")*/
    private byte[] image;

    public Product() {}

    public Product(ProductRequest productRequest, boolean isAvailable, byte[] image) {
        this.name = productRequest.getName();
        this.price = productRequest.getPrice();
        this.producer = productRequest.getProducer();
        this.description = productRequest.getDescription();
        this.recommendedAge = productRequest.getRecommendedAge();
        this.recommendedSex = productRequest.getRecommendedSex();
        this.material = productRequest.getMaterial();
        this.heightInMilimeters = productRequest.getHeightInMilimeters();
        this.widthInMilimeters = productRequest.getWidthInMilimeters();
        this.depthInMilimeters = productRequest.getDepthInMilimeters();
        this.weightInGrams = productRequest.getWeightInGrams();
        this.variant = productRequest.getVariant();
        this.Category = productRequest.getCategory();
        this.isAvailable = isAvailable;
        this.image = image;
    }


    public Product(String name, BigDecimal price, String producer, String description,String Category, int recommendedAge, String recommendedSex, String material,
                   Integer heightInMilimeters, Integer widthInMilimeters, Integer depthInMilimeters, Integer weightInGrams, boolean isAvailable) {
        this.name = name;
        this.price = price;
        this.producer = producer;
        this.description = description;
        this.Category= Category;
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
        this.Category= product.getCategory();
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

    public String getCategory() {
        return Category;
    }

    public void setCategory(String category) {
        Category = category;
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

    public String getVariant() {
        return variant;
    }

    public void setVariant(String variant) {
        this.variant = variant;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

}
