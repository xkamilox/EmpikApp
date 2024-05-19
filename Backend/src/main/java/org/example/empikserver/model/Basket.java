package org.example.empikserver.model;

import jakarta.persistence.*;

@Entity
@Table(name= "basket")
public class Basket {

  @Id
  @GeneratedValue
  @Column(name = "basket_id")
  private Long id;


  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name ="product_id")
  private Product product;

  @Column
  private int count;

  public void incrementCount(){
      count += 1;
  }

  public int decrementCount(){
      count -= 1;
      return count;
  }

    public Long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user =user;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
