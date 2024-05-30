package com.ingesoft.api.novedad_nomina;

import lombok.RequiredArgsConstructor;
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
    public Map<String, Object> createNovedadNomina(@RequestBody Map<String, Object> request){
        try {
            return service.createNovedadNomina(request);
        } catch (Exception e){
            return Map.of("message", "ERR_NOVEDAD_DATA");
        }
    }

    @GetMapping("/novedades")
    public Map<String, Object> getNovedadesNomina(){
        return service.getNovedadesNomina();
    }

    @GetMapping("/novedad/siguienteId")
    public Map<String, Object> getSiguienteId(){
        return service.getSiguienteId();
    }

}
