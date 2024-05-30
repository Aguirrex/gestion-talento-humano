package com.ingesoft.api.vacante;

import com.ingesoft.api.common.BadRequestsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static java.lang.Integer.parseInt;

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

    @GetMapping("/vacantes")
    public ResponseEntity<?> getVacantes(){
        try {
            return ResponseEntity.ok(service.getVacantes());
        } catch (Exception e){
            return ResponseEntity.badRequest().body("");
        }
    }

    @GetMapping("/vacante/{id}")
    public ResponseEntity<?> getVacante(@PathVariable String id){
        try {
            return ResponseEntity.ok(service.getVacante(parseInt(id)));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_VACANTE_DATA").build());
        }
    }

    @GetMapping("/vacantes/siguienteId")
    public ResponseEntity<?> siguienteId(){
        try {
            return ResponseEntity.ok(service.siguienteId());
        } catch (Exception e){
            return ResponseEntity.badRequest().body("");
        }
    }

    @PutMapping("/vacante/{id}")
    public ResponseEntity<?> updateVacante(
            @PathVariable String id,
            @RequestBody Map<String, Object> request
    ){
        try {
            return ResponseEntity.ok(service.updateVacante(request, parseInt(id)));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_VACANTE_DATA").build());
        }
    }

    @DeleteMapping("/vacante/{id}")
    public ResponseEntity<?> deleteVacante(@PathVariable String id){
        try {
            return ResponseEntity.ok(service.deleteVacante(parseInt(id)));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_VACANTE_DATA").build());
        }
    }
}
