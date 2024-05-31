package org.example.empikserver.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;


import java.math.BigDecimal;
import java.util.*;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "user_id")
    private User user;

    //@ManyToMany(fetch = FetchType.LAZY)
    //@JoinTable(name = "order_products", joinColumns = @JoinColumn(name= "order_id"), inverseJoinColumns = @JoinColumn(name = "product_id"))
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private Set<OrderProduct> orderProducts = new HashSet<>();

    @Column
    private String status;

    @Column
    private Date dateOfOrder;

    @Column(scale = 2)
    private BigDecimal totalPrice;

    @Column
    private String deliveryAddress;

    @Column
    private String email;

    @Column
    private String name;

    @Column
    private String surname;

    @Column
    private boolean visibleForUser = true;



    public void addOrderProduct(OrderProduct orderProduct){
        orderProducts.add(orderProduct);
    }

    public boolean isProductMultiple(Product product){
        for(OrderProduct orderPr : orderProducts){
            if( orderPr.getProduct().getId().equals(product.getId()) ){
                orderPr.incrementQuantity();
                return true;
            }
        }
        return false;
    }

    public Map<Long, Integer> getItemsIdsAndCount(){ 
        Map<Long, Integer> idsAndCount = new HashMap<>();
        for(OrderProduct orderPr : orderProducts){
            idsAndCount.put(orderPr.getProduct().getId(), orderPr.getQuantity());
        }
        return idsAndCount;
    }

    public Order() {
    }

    public Order(User user, Set<OrderProduct> orderProducts, String status, Date dateOfOrder, BigDecimal totalPrice) {
        this.user = user;
        this.orderProducts = orderProducts;
        this.status = status;
        this.dateOfOrder = dateOfOrder;
        this.totalPrice = totalPrice;

    }

    public Order(User user, String status, BigDecimal totalPrice, String deliveryAddress, String name, String surname, String email) {
        this.user = user;
        this.status = status;
        this.totalPrice = totalPrice;
        this.deliveryAddress = deliveryAddress;
        this.name = name;
        this.surname = surname;
        this.email = email;
    }

    public Order(Long id, User user, Set<OrderProduct> orderProducts, String status, Date dateOfOrder, BigDecimal totalPrice, boolean visibleForUser) {
        this.id = id;
        this.user = user;
        this.orderProducts = orderProducts;
        this.status = status;
        this.dateOfOrder = dateOfOrder;
        this.totalPrice = totalPrice;
        this.visibleForUser = visibleForUser;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<OrderProduct> getOrderProducts() {
        return orderProducts;
    }

    public void setOrderProducts(Set<OrderProduct> orderProducts) {
        this.orderProducts = orderProducts;
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

    public boolean isVisibleForUser() {
        return visibleForUser;
    }

    public void setVisibleForUser(boolean visibleForUser) {
        this.visibleForUser = visibleForUser;
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
}
