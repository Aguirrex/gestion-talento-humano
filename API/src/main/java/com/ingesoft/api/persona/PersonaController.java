package com.ingesoft.api.persona;

import com.ingesoft.api.common.BadRequestsResponse;
import lombok.RequiredArgsConstructor;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import static java.lang.Long.parseLong;

@RequiredArgsConstructor
@RestController
public class PersonaController {

    private final PersonaService service;

    @PostMapping("/persona")
    public ResponseEntity<?> createPersona(
            @RequestBody Map<String, Object> request) {
        try {
            return ResponseEntity.ok(service.createPersona(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_PERSONA_DATA"));
        }
    }

    @GetMapping("/personas")
    public ResponseEntity<?> getPersonas(){
        try{
            return ResponseEntity.ok(service.getPersonas());
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_PERSONA_DATA"));
        }
    }

    @GetMapping("/persona/{id}")
    public ResponseEntity<?> getPersona(@PathVariable String id){
        try {
            return ResponseEntity.ok(service.getPersona(parseLong(id)));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_PERSONA_DATA").build());
        }
    }

    @GetMapping("/personas/siguienteId")
    public ResponseEntity<?> siguienteId(){
        try {
            return ResponseEntity.ok(service.siguienteId());
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_PERSONA_DATA").build());
        }
    }

    @PutMapping("/persona/{id}")
    public ResponseEntity<?> updatePersona(
            @PathVariable String id,
            @RequestBody Map<String, Object> request
    ){
        try {
            return ResponseEntity.ok(service.updatePersona(request, parseLong(id)));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_PERSONA_DATA").build());
        }
    }

    @DeleteMapping("/persona/{id}")
    public ResponseEntity<?> deletePersona(@PathVariable String id){
        try {
            return ResponseEntity.ok(service.deletePersona(parseLong(id)));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_PERSONA_DATA").build());
        }
    }

}
