package com.ingesoft.api.vacante;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VacanteRequest {
    public String titulo;
    public Integer id_cargo;
    public String descripcion;
    public String url_perfil;
}
