package com.ingesoft.api.vacante;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VacanteObjectResponse {

    private Integer id;
    private String titulo;
    private Integer id_cargo;
    private String nombre_cargo;
    private String descripcion;
    private String url_perfil;
    private Date fecha_apertura;
    private Date fecha_cierre;

}
