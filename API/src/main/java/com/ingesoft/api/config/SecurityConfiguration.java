package com.ingesoft.api.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.ingesoft.api.usuario.Tipo.*;
import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {

    private static final String[] WHITE_LIST_URL = {"auth/**",};

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
//    private final LogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req ->
                    req.requestMatchers(WHITE_LIST_URL)
                            .permitAll()
                            .requestMatchers(POST,"/vacante").hasAuthority(GERENCIA.name())
                            .requestMatchers(POST,"/sucursal/**").hasAnyAuthority(GERENCIA.name(),RH.name())
                            .requestMatchers(PUT,"/sucursal/**").hasAnyAuthority(GERENCIA.name(),RH.name())
                            .requestMatchers(GET,"/sucursales").hasAnyAuthority(GERENCIA.name(),RH.name())
                            .requestMatchers(DELETE,"/sucursal/**").hasAnyAuthority(GERENCIA.name(),RH.name())
                            .requestMatchers(POST,"/cargo").hasAnyAuthority(GERENCIA.name())
                            .requestMatchers(PUT,"/cargo/**").hasAnyAuthority(GERENCIA.name(), RH.name())
                            .requestMatchers(GET,"/cargos").hasAnyAuthority(GERENCIA.name(),RH.name())
                            .requestMatchers(GET,"/cargos/**").hasAnyAuthority(GERENCIA.name())
                            .requestMatchers(GET,"/vacantes").hasAnyAuthority(GERENCIA.name(),RH.name(), PSICOLOGIA.name())
                            .requestMatchers(PUT,"/vacante/{id}").hasAnyAuthority(GERENCIA.name(),RH.name())
                            .requestMatchers(DELETE,"/vacante/{id}").hasAnyAuthority(GERENCIA.name(),RH.name())
                            .requestMatchers(POST, "/persona").hasAnyAuthority(RH.name())
                            .requestMatchers(GET, "/personas").hasAnyAuthority(RH.name())
                            .requestMatchers(GET, "/persona/{id}").hasAnyAuthority(RH.name())
                            .requestMatchers(GET, "/personas/siguienteId").hasAnyAuthority(RH.name())
                            .requestMatchers(PUT, "/persona/{id}").hasAnyAuthority(RH.name())
                            .requestMatchers(DELETE, "/persona/{id}").hasAnyAuthority(RH.name())
                            .requestMatchers(POST,"/candidato").hasAnyAuthority(RH.name())
                            .requestMatchers(GET,"/candidatos").hasAnyAuthority(RH.name())
                            .requestMatchers(GET,"/candidato/{id_vacante}/{id_persona}").hasAnyAuthority(RH.name(), PSICOLOGIA.name(), GERENCIA.name())
                            .requestMatchers(PUT,"/candidato").hasAnyAuthority(RH.name())
                            .requestMatchers(POST,"/novedad").hasAnyAuthority(RH.name())
                            .requestMatchers(GET,"/novedades").hasAnyAuthority(RH.name())
                            .requestMatchers(GET,"/novedad/siguienteId").hasAnyAuthority(RH.name())
                            .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
