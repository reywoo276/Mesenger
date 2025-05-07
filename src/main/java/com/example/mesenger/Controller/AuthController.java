package com.example.mesenger.Controller;

import com.example.mesenger.DTO.JwtAuthenticationResponse;
import com.example.mesenger.DTO.SignInRequest;
import com.example.mesenger.DTO.SignUpRequest;
import com.example.mesenger.Service.AuthenticationService;
import com.example.mesenger.Service.JwtService;
import io.jsonwebtoken.Claims;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Аутентификация")
public class AuthController {
    private final AuthenticationService authenticationService;
    private final JwtService jwtService;

    @Operation(summary = "Регистрация пользователя")
    @PostMapping("/sign-up")
    public JwtAuthenticationResponse signUp(@RequestBody @Valid SignUpRequest request) {
        return authenticationService.signUp(request);
    }

    @Operation(summary = "Авторизация пользователя")
    @PostMapping("/sign-in")
    public JwtAuthenticationResponse signIn(@RequestBody @Valid SignInRequest request) {
        return authenticationService.signIn(request);
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getMe(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = authorizationHeader.substring(7);
        Claims claims = jwtService.extractAllClaims(token);

        Map<String, Object> response = Map.of(
                "userId", String.valueOf(claims.get("userId", Integer.class)),
                "username", claims.get("username", String.class),
                "email", claims.get("email", String.class)
        );
        return ResponseEntity.ok(response);
    }
}
