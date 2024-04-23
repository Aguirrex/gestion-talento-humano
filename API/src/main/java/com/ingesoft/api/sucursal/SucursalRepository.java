package com.ingesoft.api.sucursal;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SucursalRepository extends JpaRepository<Sucursal, Integer>{
    Optional<Sucursal> findByNombre(String nombre);
}
