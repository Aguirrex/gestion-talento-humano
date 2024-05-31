package com.ingesoft.api.contrato_persona;

import com.ingesoft.api.common.BadRequestsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import static java.lang.Long.parseLong;

import java.util.Map;

@RequiredArgsConstructor
@RestController
public class ContratoPersonaController {
    
    private final ContratoPersonaService service;

    @PostMapping("/empleado")
    public ResponseEntity<?> createEmpleado(@RequestBody Map<String, Object> request){
        try {
            System.out.println(request);
            return ResponseEntity.ok(service.createEmpleado(request));
        } catch (Exception e){
            System.out.println(e);
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_EMPLEADO_DATA").build());
        }
    }

    @GetMapping("/empleados")
    public ResponseEntity<?> getEmpleados(){
        try{
            return ResponseEntity.ok(service.getEmpleados());
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_EMPLEADO_DATA"));
        }
    }

    @GetMapping("/empleado/{id}")
    public ResponseEntity<?> getEmpleado(@PathVariable String id){
        try {
            return ResponseEntity.ok(service.getEmpleado(parseLong(id)));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_EMPLEADO_DATA").build());
        }
    }

    @GetMapping("/empleados/siguienteId")
    public ResponseEntity<?> siguienteId(){
        try {
            return ResponseEntity.ok(service.siguienteId());
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_EMPLEADO_DATA").build());
        }
    }

    @PutMapping("/empleado/{id}")
    public ResponseEntity<?> updateEmpleado(
            @PathVariable String id,
            @RequestBody Map<String, Object> request
    ){
        try {
            return ResponseEntity.ok(service.updateEmpleado(request, parseLong(id)));
        } catch (Exception e){
            e.printStackTrace();
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_EMPLEADO_DATA").build());
        }
    }
}
