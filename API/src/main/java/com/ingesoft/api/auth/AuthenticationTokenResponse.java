package com.ingesoft.api.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationTokenResponse {

    private String message;
    private AuthenticationUsuarioResponse usuario;
}
