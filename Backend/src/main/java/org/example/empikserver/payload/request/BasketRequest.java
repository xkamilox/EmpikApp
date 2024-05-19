package org.example.empikserver.payload.request;

public class BasketRequest {

    private String operationName;

    private Long productId;

    private int count;


    public Integer getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getOperationName() {
        return operationName;
    }

    public void setOperationName(String operationName) {
        this.operationName = operationName;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

}
