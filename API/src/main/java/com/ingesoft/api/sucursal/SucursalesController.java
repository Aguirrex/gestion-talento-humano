package com.ingesoft.api.sucursal;

import com.ingesoft.api.common.BadRequestsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sucursales")
public class SucursalesController {

    private final SucursalService service;

    @GetMapping
    public ResponseEntity<?> getSucursales(){
        try{
            return ResponseEntity.ok(service.getSucursales());
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_SUCURSAL_DATA"));
        }
    }

    @GetMapping("/siguienteId")
    public ResponseEntity<?> siguienteId(){
        try {
            return ResponseEntity.ok(service.siguienteId());
        } catch (Exception e){
            return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_SUCURSAL_DATA"));
        }
    }


}
