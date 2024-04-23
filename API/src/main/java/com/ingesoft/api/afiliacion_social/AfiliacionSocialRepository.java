package com.ingesoft.api.afiliacion_social;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AfiliacionSocialRepository extends JpaRepository<AfiliacionSocial, Long>{
    List<AfiliacionSocial> findByEstado(boolean estado);
}
