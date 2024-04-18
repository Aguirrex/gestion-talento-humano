package com.ingesoft.api.auth;

import com.ingesoft.api.config.JwtService;
import com.ingesoft.api.usuario.Tipo;
import com.ingesoft.api.usuario.Usuario;
import com.ingesoft.api.usuario.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {

        var user = Usuario.builder()
                .dni(request.getDni())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .tipo(Tipo.valueOf(request.getTipo()))
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .message("OK")
                .usuario(AuthenticationUsuarioResponse.builder()
                        .dni(user.getDni())
                        .tipo(user.getTipo().name())
                        .build())
                .token(jwtToken)
                .build();

    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getDni(),
                        request.getPassword()
                )
        );
        var user = repository.findByDni(request.getDni())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .message("OK")
                .usuario(AuthenticationUsuarioResponse.builder()
                        .dni(user.getDni())
                        .tipo(user.getTipo().name())
                        .build())
                .token(jwtToken)
                .build();
    }

    public AuthenticationTokenResponse authenticateToken(HttpHeaders headers){
        String authHeader = headers.getFirst(HttpHeaders.AUTHORIZATION);
        final String jwt = authHeader.substring(7);
        var user = jwtService.getUser(jwt);
        return AuthenticationTokenResponse.builder()
                .message("OK")
                .usuario(AuthenticationUsuarioResponse.builder()
                        .dni(user.getDni())
                        .tipo(user.getTipo().name())
                        .build())
                .build();
    }
}