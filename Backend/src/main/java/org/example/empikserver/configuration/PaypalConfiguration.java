package org.example.empikserver.configuration;

import com.paypal.core.PayPalEnvironment;
import com.paypal.core.PayPalHttpClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PaypalConfiguration {

    @Bean
    public PayPalHttpClient getPaypalClient(@Value("${paypal.client.id}") String clientId,
                                            @Value("${paypal.client.secret}") String clientSecret) {

        return new PayPalHttpClient( new PayPalEnvironment.Sandbox(clientId, clientSecret) );
    }




}
