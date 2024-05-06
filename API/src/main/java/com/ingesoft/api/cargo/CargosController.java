package com.ingesoft.api.cargo;

import com.ingesoft.api.common.BadRequestsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cargos")
public class CargosController {

    private final CargoService service;

    @GetMapping
    public ResponseEntity<?> getCargos(){
        try{
            return ResponseEntity.ok(service.getCargos());
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_CARGO_DATA"));
        }
    }

    @GetMapping("/siguienteId")
    public ResponseEntity<?> siguienteId(){
        try {
            return ResponseEntity.ok(service.siguienteId());
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_CARGO_DATA"));
        }
    }
}
