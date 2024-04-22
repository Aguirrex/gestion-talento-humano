package com.ingesoft.api.vacante;

import com.ingesoft.api.cargo.CargoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class VacanteService {

    private final VacanteRepository vacRepository;
    private final CargoRepository carRepository;

    public VacanteResponse createVacante(VacanteRequest request){

        var cargo = carRepository.findById(request.getId_cargo())
                .orElseThrow();

        var vacante = Vacante.builder()
                .cargo(cargo)
                .titulo(request.getTitulo())
                .descripcion(request.getDescripcion())
                .url_perfil(request.getUrl_perfil())
                .estado(Boolean.TRUE)
                .fecha_apertura(new Date())
                .fecha_cierre(null)
                .build();

        vacRepository.save(vacante);

        return VacanteResponse.builder()
                .message("OK")
                .vacante(VacanteObjectResponse.builder()
                        .id(vacante.getId())
                        .titulo(vacante.getTitulo())
                        .id_cargo(vacante.getCargo().getId())
                        .nombre_cargo(vacante.getCargo().getNombre())
                        .descripcion(vacante.getDescripcion())
                        .url_perfil(vacante.getUrl_perfil())
                        .fecha_apertura(vacante.getFecha_apertura())
                        .fecha_cierre(vacante.getFecha_cierre())
                        .build())
                .build();


    }
}
