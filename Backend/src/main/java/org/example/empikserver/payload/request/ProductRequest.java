package org.example.empikserver.payload.request;

import jakarta.persistence.Column;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

public class ProductRequest {

    private String name;
    private BigDecimal price;
    private String producer;
    private String description;
    private int recommendedAge;
    private String recommendedSex;
    private String material;
    private Integer heightInMilimeters;
    private Integer widthInMilimeters;
    private Integer depthInMilimeters;
    private Integer weightInGrams;
    private String variant;
    private String Category;
    private MultipartFile image;

    public ProductRequest() {
    }

    public ProductRequest(String name, BigDecimal price, String producer, String description, int recommendedAge,
                          String recommendedSex, String material, Integer heightInMilimeters, Integer widthInMilimeters,
                          Integer depthInMilimeters, Integer weightInGrams, String variant, String category, MultipartFile image) {
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
        this.variant = variant;
        Category = category;
        this.image = image;
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

    public String getVariant() {
        return variant;
    }

    public void setVariant(String variant) {
        this.variant = variant;
    }

    public String getCategory() {
        return Category;
    }

    public void setCategory(String category) {
        Category = category;
    }

    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }
}
