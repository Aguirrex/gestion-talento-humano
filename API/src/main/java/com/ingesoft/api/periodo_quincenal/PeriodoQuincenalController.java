package com.ingesoft.api.periodo_quincenal;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class PeriodoQuincenalController {

    private final PeriodoQuincenalService service;

    @GetMapping("/periodos_quincenales")
    public ResponseEntity<?> getPeriodosQuincenales(){
        try {
            return ResponseEntity.ok(service.getPeriodosQuincenales());
        } catch (Exception e){
            return ResponseEntity.badRequest().body("");
        }
    }
}
