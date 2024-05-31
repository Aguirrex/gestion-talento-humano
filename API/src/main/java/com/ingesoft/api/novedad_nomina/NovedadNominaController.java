package com.ingesoft.api.novedad_nomina;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequiredArgsConstructor
@RestController
public class NovedadNominaController {

    private final NovedadNominaService service;

    @PostMapping("/novedad")
    public ResponseEntity<?> createNovedadNomina(@RequestBody Map<String, Object> request){
        try {
            return ResponseEntity.ok(service.createNovedadNomina(request));
        } catch (Exception e){
            System.out.println(e);
            return ResponseEntity.badRequest().body(Map.of("message", "ERR_NOVEDAD_DATA"));
        }
    }

    @GetMapping("/novedades")
    public ResponseEntity<?> getNovedadesNomina(){
        try {
            return ResponseEntity.ok(service.getNovedadesNomina());
        }catch (Exception e){
            return ResponseEntity.badRequest().body("");
        }
    }

    @GetMapping("/novedades/siguienteId")
    public ResponseEntity<?> getSiguienteId(){
        return ResponseEntity.ok(service.getSiguienteId());
    }
}
