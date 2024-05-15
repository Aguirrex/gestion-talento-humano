package com.ingesoft.api.sucursal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SiguienteIdResponse {
    public String message;
    public Integer siguiente_id_sucursales;
}
