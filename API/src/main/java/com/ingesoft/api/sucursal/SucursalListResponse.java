package com.ingesoft.api.sucursal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SucursalListResponse {
    public String message;
    public List<SucursalObjectResponse> sucursales;
}
