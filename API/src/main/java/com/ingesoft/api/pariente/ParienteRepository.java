package com.ingesoft.api.pariente;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ParienteRepository extends JpaRepository<Pariente, Integer> {
    Optional<Pariente> findByNombre1(String nombre1);
}
