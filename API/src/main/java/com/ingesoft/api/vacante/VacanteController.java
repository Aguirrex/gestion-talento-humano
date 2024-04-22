package com.ingesoft.api.vacante;

import com.ingesoft.api.common.BadRequestsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class VacanteController {

    private final VacanteService service;

    @PostMapping("/vacante")
    public ResponseEntity<?> createVacante(

            @RequestBody VacanteRequest request
    ) {
        try {
            return ResponseEntity.ok(service.createVacante(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_VACANTE_DATA").build());
        }

    }
}
