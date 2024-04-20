package com.ingesoft.api.tipos_afiliaciones;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TiposAfiliacionesRepository extends JpaRepository<TiposAfiliaciones, Integer>{
    Optional<TiposAfiliaciones> findByNombre(String nombre);
}
