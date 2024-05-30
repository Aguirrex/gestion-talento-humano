package com.ingesoft.api.vacante;

import com.ingesoft.api.cargo.CargoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class VacanteService {

    private final VacanteRepository vacRepository;
    private final CargoRepository carRepository;

    public Map<String, Object> createVacante(VacanteRequest request){

        var cargo = carRepository.findById(request.getId_cargo()).orElseThrow();

        var vacante = Vacante.builder()
                .cargo(cargo)
                .titulo(request.getTitulo())
                .descripcion(request.getDescripcion())
                .url_perfil(null)
                .estado(Boolean.TRUE)
                .fecha_apertura(new Date())
                .fecha_cierre(null)
                .build();

        vacRepository.save(vacante);

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");
        responseMap.put("vacante", VacanteMap(vacante));

        return responseMap;
    }

    public Map<String, Object> getVacantes(){
        var vacantes = vacRepository.findAll();

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");
        responseMap.put("vacantes", vacantes.stream().map(this::VacanteMap));

        return responseMap;
    }

    public Map<String, Object> getVacante(Integer id){
        var vacante = vacRepository.findById(id).orElseThrow();

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");
        responseMap.put("vacante", VacanteMap(vacante));

        return responseMap;
    }

    public Map<String, Object> siguienteId(){
        var vacante = vacRepository.findAll().stream().max(Comparator.comparingInt(Vacante::getId)).orElseThrow();

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");
        responseMap.put("siguiente_id_vacantes", vacante.getId() + 1);

        return responseMap;
    }

    public Map<String, Object> updateVacante(Map<String, Object> request, Integer id){
        var vacante = vacRepository.findById(id).orElseThrow();

        vacante.setTitulo(request.get("titulo").toString());
        vacante.setDescripcion(request.get("descripcion").toString());
        vacante.setCargo(carRepository.findById(Integer.parseInt(request.get("id_cargo").toString())).orElseThrow());

        if (request.get("estado") == Boolean.FALSE){
            vacante.setEstado(Boolean.FALSE);
            vacante.setFecha_cierre(new Date());
        }else{
            vacante.setEstado(Boolean.TRUE);
            vacante.setFecha_cierre(null);
        }

        vacRepository.save(vacante);

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");
        responseMap.put("vacante", VacanteMap(vacante));

        return responseMap;
    }

    public Map<String, Object> deleteVacante(Integer id) {
        var vacante = vacRepository.findById(id).orElseThrow();
        vacante.setEstado(Boolean.FALSE);
        vacante.setFecha_cierre(new Date());
        vacRepository.save(vacante);

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");

        return responseMap;
    }

    private Map<String,Object> VacanteMap(Vacante vacante) {
        Map<String, Object> vacanteMap = new HashMap<>();
        vacanteMap.put("id", vacante.getId());
        vacanteMap.put("titulo", vacante.getTitulo());
        vacanteMap.put("id_cargo", vacante.getCargo().getId());
        vacanteMap.put("nombre_cargo", vacante.getCargo().getNombre());
        vacanteMap.put("descripcion", vacante.getDescripcion());
        vacanteMap.put("url_perfil", vacante.getUrl_perfil());
        vacanteMap.put("fecha_apertura", vacante.getFecha_apertura());
        vacanteMap.put("fecha_cierre", vacante.getFecha_cierre());
        vacanteMap.put("estado", vacante.getEstado());
        return vacanteMap;
    }
}
