package com.ingesoft.api.novedad_nomina;

import com.ingesoft.api.contrato_persona.ContratoPersonaRepository;
import com.ingesoft.api.periodo_quincenal.PeriodoQuincenalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NovedadNominaService {

    final NovedadNominaRepository novedadNominaRepository;
    final ContratoPersonaRepository contratoPersonaRepository;
    final PeriodoQuincenalRepository periodoQuincenalRepository;

    public Map<String, Object> createNovedadNomina(Map<String, Object> request){

        var contratoPersona = contratoPersonaRepository.findById((Integer)request.get("id_contrato")).orElseThrow();
        var periodoQuincenal = periodoQuincenalRepository.findById((Integer)request.get("id_periodo_quincenal")).orElseThrow();

        var novedadNomina = NovedadNomina.builder()
                .contratoPersona(contratoPersona)
                .periodoQuincenal(periodoQuincenal)
                .tipo(Tipo.valueOf((String)request.get("tipo")))
                .cantidad(request.get("cantidad") != null ? Short.valueOf(request.get("cantidad").toString()) : null)
                .valor(BigDecimal.valueOf((Double)request.get("valor")))
                .es_descuento((Boolean)request.get("es_descuento"))
                .detalles((String)request.get("detalles"))
                .build();

        novedadNominaRepository.save(novedadNomina);

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");
        responseMap.put("novedades", NovedadNominaMap(novedadNomina));

        return responseMap;
    }

    public Map<String, Object> getNovedadesNomina(){
        var novedades = novedadNominaRepository.findAll();
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");
        responseMap.put("novedades", novedades.stream().map(this::NovedadNominaMap));
        return responseMap;
    }

    public Map<String, Object> getSiguienteId(){
        var novedad = novedadNominaRepository.findAll().stream().max(Comparator.comparingInt(NovedadNomina::getId)).orElseThrow();
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");
        responseMap.put("siguiente_id_novedades", novedad.getId() + 1);
        return responseMap;
    }

    Map<String, Object> NovedadNominaMap(NovedadNomina novedadNomina) {
        Map<String, Object> novedadNominaMap = new HashMap<>();
        novedadNominaMap.put("id", novedadNomina.getId());
        novedadNominaMap.put("id_contrato", novedadNomina.getContratoPersona().getId());
        novedadNominaMap.put("id_periodo_quincenal", novedadNomina.getPeriodoQuincenal().getId());
        novedadNominaMap.put("tipo", novedadNomina.getTipo());
        novedadNominaMap.put("cantidad", novedadNomina.getCantidad());
        novedadNominaMap.put("valor", novedadNomina.getValor());
        novedadNominaMap.put("es_descuento", novedadNomina.getEs_descuento());
        novedadNominaMap.put("detalles", novedadNomina.getDetalles());
        return novedadNominaMap;
    }
}
package com.ingesoft.api.novedad_nomina;

import com.ingesoft.api.contrato_persona.ContratoPersonaRepository;
import com.ingesoft.api.periodo_quincenal.PeriodoQuincenalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NovedadNominaService {

    final NovedadNominaRepository novedadNominaRepository;
    final ContratoPersonaRepository contratoPersonaRepository;
    final PeriodoQuincenalRepository periodoQuincenalRepository;

    public Map<String, Object> createNovedadNomina(Map<String, Object> request){

        var contratoPersona = contratoPersonaRepository.findById(Long.valueOf((Integer)request.get("id_contrato"))).orElseThrow();
        var periodoQuincenal = periodoQuincenalRepository.findById((Integer)request.get("id_periodo_quincenal")).orElseThrow();

        var novedadNomina = NovedadNomina.builder()
                .contratoPersona(contratoPersona)
                .periodoQuincenal(periodoQuincenal)
                .tipo(Tipo.valueOf((String)request.get("tipo")))
                .cantidad(request.get("cantidad") != null ? Short.valueOf(request.get("cantidad").toString()) : null)
                .valor(BigDecimal.valueOf((Double)request.get("valor")))
                .es_descuento((Boolean)request.get("es_descuento"))
                .detalles((String)request.get("detalles"))
                .build();

        novedadNominaRepository.save(novedadNomina);

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");
        responseMap.put("novedades", NovedadNominaMap(novedadNomina));

        return responseMap;
    }

    public Map<String, Object> getNovedadesNomina(){
        var novedades = novedadNominaRepository.findAll();
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");
        responseMap.put("novedades", novedades.stream().map(this::NovedadNominaMap));
        return responseMap;
    }

    public Map<String, Object> getSiguienteId(){
        var novedad = novedadNominaRepository.findAll().stream().max(Comparator.comparingInt(NovedadNomina::getId)).orElseThrow();
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");
        responseMap.put("siguiente_id_novedades", novedad.getId() + 1);
        return responseMap;
    }

    Map<String, Object> NovedadNominaMap(NovedadNomina novedadNomina) {
        Map<String, Object> novedadNominaMap = new HashMap<>();
        novedadNominaMap.put("id", novedadNomina.getId());
        novedadNominaMap.put("id_contrato", novedadNomina.getContratoPersona().getId());
        novedadNominaMap.put("id_periodo_quincenal", novedadNomina.getPeriodoQuincenal().getId());
        novedadNominaMap.put("tipo", novedadNomina.getTipo());
        novedadNominaMap.put("cantidad", novedadNomina.getCantidad());
        novedadNominaMap.put("valor", novedadNomina.getValor());
        novedadNominaMap.put("es_descuento", novedadNomina.getEs_descuento());
        novedadNominaMap.put("detalles", novedadNomina.getDetalles());
        return novedadNominaMap;
    }
}
