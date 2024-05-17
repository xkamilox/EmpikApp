package org.example.empikserver.security.services;

import jakarta.transaction.Transactional;
import org.example.empikserver.exception.TokenRefreshException;
import org.example.empikserver.model.RefreshToken;
import org.example.empikserver.model.User;
import org.example.empikserver.repository.RefreshTokenRepository;
import org.example.empikserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {
    @Value("${empik.app.jwtRefreshExpirationMs}")
    private Long refreshTokenDurationMs;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken createRefreshToken(Long userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Optional<RefreshToken> existingTokenOpt = refreshTokenRepository.findByUser(user);

        RefreshToken refreshToken;
        if (existingTokenOpt.isPresent()) { //token juz jest

            refreshToken = existingTokenOpt.get();
            refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
            refreshToken.setToken(UUID.randomUUID().toString());
        } else {    //nie ma
            refreshToken = new RefreshToken();
            refreshToken.setUser(user);
            refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
            refreshToken.setToken(UUID.randomUUID().toString());
        }
        //wstawienie albo update
        return refreshTokenRepository.save(refreshToken);
    }

    @Transactional
    public RefreshToken verifyExpiration(RefreshToken token){
        if(token.getExpiryDate().compareTo(Instant.now()) < 0){
            System.out.println("token wygas");
            refreshTokenRepository.deleteByToken(token.getToken());
            throw new TokenRefreshException(token.getToken(),"Refresh token was expired. Please make a new signin request");
        }
        return token;
    }

    @Transactional
    public int deleteByUserId(Long userId){
        return refreshTokenRepository.deleteByUser(userRepository.findById(userId).get());
    }

}
