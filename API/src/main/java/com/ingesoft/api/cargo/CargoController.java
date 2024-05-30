package com.ingesoft.api.cargo;

import com.ingesoft.api.common.BadRequestsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cargo")
public class CargoController {

        private final CargoService service;

        @PostMapping
        public ResponseEntity<?> createCargo(
                @RequestBody Map<String, Object> request
        ){
            try{
                return ResponseEntity.ok(service.createCargo(request));
            } catch (Exception e){
                return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_CARGO_DATA"));
            }
        }

        @GetMapping("/{id}")
        public ResponseEntity<?> getCargo(@PathVariable String id){
            try {
                return ResponseEntity.ok(service.getCargo(Integer.parseInt(id)));
            } catch (Exception e){
                return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_CARGO_DATA"));
            }
        }

        @PutMapping("/{id}")
        public ResponseEntity<?> updateCargo(
                @PathVariable String id,
                @RequestBody Map<String, Object> request
                ){
            try {
                return ResponseEntity.ok(service.updateCargo(request, Integer.parseInt(id)));
            } catch (Exception e){
                return ResponseEntity.badRequest().body(BadRequestsResponse.builder().message("ERR_CARGO_DATA"));
            }
        }
}
