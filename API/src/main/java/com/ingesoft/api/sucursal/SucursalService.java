package com.ingesoft.api.sucursal;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SucursalService {

    private final SucursalRepository sucursalRepository;

    public SucursalResponse createSucursal(SucursalRequest request){

        var sucursal = Sucursal.builder()
                .nombre(request.getNombre())
                .estado(Boolean.TRUE)
                .build();

        sucursalRepository.save(sucursal);

        return SucursalResponse.builder()
                .message("OK")
                .sucursal(SucursalObjectResponse.builder()
                        .id(sucursal.getId())
                        .nombre(sucursal.getNombre())
                        .estado(sucursal.getEstado())
                        .build())
                .build();
    }

    public SucursalListResponse getSucursales(){
        var sucursales = sucursalRepository.findAll();
        return SucursalListResponse.builder()
                .message("OK")
                .sucursales(sucursales.stream().map(sucursal -> SucursalObjectResponse.builder()
                        .id(sucursal.getId())
                        .nombre(sucursal.getNombre())
                        .estado(sucursal.getEstado())
                        .build()).collect(Collectors.toList()))
                .build();
    }

    public SucursalResponse getSucursal(Integer id) {
        var sucursal = sucursalRepository.findById(id).orElseThrow();
        return SucursalResponse.builder()
                .message("OK")
                .sucursal(SucursalObjectResponse.builder()
                        .id(sucursal.getId())
                        .nombre(sucursal.getNombre())
                        .estado(sucursal.getEstado())
                        .build())
                .build();
    }

    public SiguienteIdResponse siguienteId(){
        var sucursal = sucursalRepository.findAll().stream().max(Comparator.comparingInt(Sucursal::getId)).orElseThrow();
        return SiguienteIdResponse.builder()
                .message("OK")
                .siguiente_id_sucursales(sucursal.getId() + 1)
                .build();
    }

    public Map<String, Object> updateSucursal(Map<String, Object> request, Integer id){
        var sucursal = sucursalRepository.findById(id).orElseThrow();
        sucursal.setNombre(request.get("nombre").toString());
        sucursalRepository.save(sucursal);
        return Map.of("message", "OK", "sucursal", sucursal);
    }

    public Map<String, Object> deleteSucursal(Integer id){
        var sucursal = sucursalRepository.findById(id).orElseThrow();
        sucursal.setEstado(Boolean.FALSE);
        sucursalRepository.save(sucursal);
        return Map.of("message", "OK");
    }
}
