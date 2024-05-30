package com.ingesoft.api.sucursal;

import com.ingesoft.api.common.BadRequestsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static java.lang.Integer.parseInt;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sucursal")
public class SucursalController {

    private final SucursalService service;

    @PostMapping
    public ResponseEntity<?> createSucursal(
            @RequestBody SucursalRequest request
    ){
        try{
            return ResponseEntity.ok(service.createSucursal(request));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_SUCURSAL_DATA"));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSucursal(@PathVariable String id){
        try {
            return ResponseEntity.ok(service.getSucursal(parseInt(id)));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_SUCURSAL_DATA"));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSucursal(
            @PathVariable String id,
            @RequestBody Map<String, Object> request
            ){
        try {
            return ResponseEntity.ok(service.updateSucursal(request, parseInt(id)));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_SUCURSAL_DATA"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSucursal(@PathVariable String id){
        try {
            return ResponseEntity.ok(service.deleteSucursal(parseInt(id)));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_SUCURSAL_DATA"));
        }
    }

}
