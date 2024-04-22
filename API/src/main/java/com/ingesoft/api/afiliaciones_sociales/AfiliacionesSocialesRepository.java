package com.ingesoft.api.afiliaciones_sociales;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AfiliacionesSocialesRepository extends JpaRepository<AfiliacionesSociales, Long>{
    List<AfiliacionesSociales> findByEstado(boolean estado);
}
