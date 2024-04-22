package com.ingesoft.api.vacante;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VacanteResponse {

    private String message;
    private VacanteObjectResponse vacante;
}
