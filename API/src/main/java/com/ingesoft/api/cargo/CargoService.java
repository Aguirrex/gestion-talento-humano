package com.ingesoft.api.cargo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CargoService {

    private final CargoRepository cargoRepository;

    public Map<String, Object> createCargo(Map<String,Object> request) {
        var cargo = Cargo.builder()
                .nombre(request.get("nombre").toString())
                .descripcion(request.get("descripcion").toString())
                .build();

        cargoRepository.save(cargo);

        return Map.of(
                "message", "OK",
                "cargo", Map.of(
                        "id", cargo.getId(),
                        "nombre", cargo.getNombre(),
                        "descripcion", cargo.getDescripcion()
                )
        );
    }

    public Map<String, Object> getCargos() {
        var cargos = cargoRepository.findAll();
        return Map.of(
                "message", "OK",
                "cargos", cargos.stream().map(cargo -> Map.of(
                        "id", cargo.getId(),
                        "nombre", cargo.getNombre(),
                        "descripcion", cargo.getDescripcion()
                ))
        );
    }

    public Map<String, Object> getCargo(Integer id) {
        var cargo = cargoRepository.findById(id).orElseThrow();
        return Map.of(
                "message", "OK",
                "cargo", Map.of(
                        "id", cargo.getId(),
                        "nombre", cargo.getNombre(),
                        "descripcion", cargo.getDescripcion()
                )
        );

    }

    public Map<String, Object> siguienteId() {
        var cargo = cargoRepository.findAll().stream().max(Comparator.comparingInt(Cargo::getId)).orElseThrow();
        return Map.of(
                "message", "OK",
                "siguiente_id_cargos", cargo.getId() + 1
        );
    }

    public Map<String, Object> updateCargo(Map<String, Object> request, Integer id) {
        var cargo = cargoRepository.findById(id).orElseThrow();
        cargo.setNombre(request.get("nombre").toString());
        cargo.setDescripcion(request.get("descripcion").toString());
        cargoRepository.save(cargo);

        return Map.of(
                "message", "OK",
                "cargo", Map.of(
                        "id", cargo.getId(),
                        "nombre", cargo.getNombre(),
                        "descripcion", cargo.getDescripcion()
                )
        );
    }
}
