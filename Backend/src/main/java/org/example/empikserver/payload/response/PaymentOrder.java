package org.example.empikserver.payload.response;

import java.io.Serializable;

public class PaymentOrder implements Serializable {

    private String status;
    private String payId;
    private String redirectUrl;


    public PaymentOrder() {
    }

    public PaymentOrder(String status, String payId, String redirectUrl) {
        this.status = status;
        this.payId = payId;
        this.redirectUrl = redirectUrl;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPayId() {
        return payId;
    }

    public void setPayId(String payId) {
        this.payId = payId;
    }

    public String getRedirectUrl() {
        return redirectUrl;
    }

    public void setRedirectUrl(String redirectUrl) {
        this.redirectUrl = redirectUrl;
    }



    public PaymentOrder(String status) {
        this.status = status;
    }
}
