package dev.jigar.linktree.controller;

import dev.jigar.linktree.dto.AuthRequestDTO;
import dev.jigar.linktree.dto.AuthResponseDTO;
import dev.jigar.linktree.entity.User;
import dev.jigar.linktree.service.AuthService;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthService authService;

    @Transactional
    @PostMapping("/signup")
    public ResponseEntity<AuthResponseDTO> signup(@RequestBody AuthRequestDTO requestDTO) {
        User user = null;
        try {
            user = authService.signup(requestDTO);
        } catch (Exception e) {
            logger.error("Error during signup: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(AuthResponseDTO.builder()
                                .id(user.getId())
                                .email(user.getEmail())
                                .isVerified(user.getIsVerified())
                                .isAdmin(user.getIsAdmin())
                                .createdAt(user.getCreatedAt())
                                .lastLogin(user.getLastLogin())
                                .build()
        );
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO requestDTO) {
        User user = null;
        try {
            user = authService.login(requestDTO);
        } catch (Exception e) {
            logger.error("Error during login: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(AuthResponseDTO.builder()
                                .id(user.getId())
                                .email(user.getEmail())
                                .isVerified(user.getIsVerified())
                                .isAdmin(user.getIsAdmin())
                                .createdAt(user.getCreatedAt())
                                .lastLogin(user.getLastLogin())
                                .build()
        );
    }

}
