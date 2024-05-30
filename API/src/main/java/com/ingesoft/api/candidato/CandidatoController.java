package com.ingesoft.api.candidato;

import com.ingesoft.api.common.BadRequestsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static java.lang.Integer.parseInt;

@RequiredArgsConstructor
@RestController
public class CandidatoController {

    private final CandidatoService service;

    @PostMapping("/candidato")
    public ResponseEntity<?> createCandidato(@RequestBody Map<String, Object> request){
        try {
            return ResponseEntity.ok(service.createCandidato(request));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_CANDIDATO_DATA").build());
        }
    }

    @GetMapping("/candidatos")
    public ResponseEntity<?> getCandidatos(){
        try {
            return ResponseEntity.ok(service.getCandidatos());
        } catch (Exception e){
            return ResponseEntity.badRequest().body("");
        }
    }

    @GetMapping("/candidato/{id_vacante}/{id_persona}")
    public ResponseEntity<?> getCandidato(
            @PathVariable String id_vacante,
            @PathVariable String id_persona){

        try {
            return ResponseEntity.ok(service.getCandidato(parseInt(id_vacante), parseInt(id_persona)));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_CANDIDATO_DATA").build());
        }
    }

    @PutMapping("/candidato")
    public ResponseEntity<?> updateCandidato(@RequestBody Map<String, Object> request){
        try {
            return ResponseEntity.ok(service.updateCandidato(request));
        } catch (Exception e){
            
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_CANDIDATO_DATA").build());
        }
    }
}
