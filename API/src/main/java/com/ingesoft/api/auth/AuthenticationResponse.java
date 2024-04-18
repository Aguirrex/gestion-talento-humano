package com.ingesoft.api.auth;

import com.fasterxml.jackson.core.JsonGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    private String message;
    private AuthenticationUsuarioResponse usuario;
    private String token;
}
