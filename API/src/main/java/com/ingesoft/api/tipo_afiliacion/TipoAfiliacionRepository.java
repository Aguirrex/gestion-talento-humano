package com.ingesoft.api.tipo_afiliacion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TipoAfiliacionRepository extends JpaRepository<TipoAfiliacion, Integer>{
    Optional<TipoAfiliacion> findByNombre(String nombre);
}
