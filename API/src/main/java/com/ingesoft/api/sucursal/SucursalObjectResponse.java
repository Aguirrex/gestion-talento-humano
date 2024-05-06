package com.ingesoft.api.sucursal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SucursalObjectResponse {
    public Integer id;
    public String nombre;
    public Boolean estado;
}
