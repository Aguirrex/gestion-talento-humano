package com.ingesoft.api.candidato;

import com.ingesoft.api.contrato_persona.ContratoPersona;
import com.ingesoft.api.contrato_persona.ContratoPersonaRepository;
import com.ingesoft.api.contrato_persona.Tipo;
import com.ingesoft.api.persona.PersonaRepository;
import com.ingesoft.api.salario.Salario;
import com.ingesoft.api.salario.SalarioRepository;
import com.ingesoft.api.sucursal.SucursalRepository;
import com.ingesoft.api.vacante.VacanteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CandidatoService {

    private final VacanteRepository vacRepository;
    private final PersonaRepository perRepository;
    private final CandidatoRepository canRepository;
    private final ContratoPersonaRepository conPerRepository;
    private final SucursalRepository sucRepository;
    private final SalarioRepository salRepository;

    public Map<String, Object> createCandidato(Map<String, Object> request){

            var vacante = vacRepository.findById((Integer)request.get("id_vacante")).orElseThrow();
            var persona = perRepository.findById(((Number)request.get("id_persona")).longValue()).orElseThrow();

            var candidato = Candidato.builder()
                    .id(CandidatoId.builder()
                            .vacante(vacante)
                            .persona(persona)
                            .build())
                    .estado(Boolean.TRUE)
                    .build();

            canRepository.save(candidato);

            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("message", "OK");
            responseMap.put("candidato", CandidatoMap(candidato));

            return responseMap;
    }

    public Map<String, Object> getCandidatos(){
        var candidatos = canRepository.findAll();

        var candidatosActivos = candidatos.stream().filter(candidato -> candidato.getEstado() != null).toList();

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");
        responseMap.put("candidatos", candidatosActivos.stream().map(this::CandidatoMap));

        return responseMap;
    }

    public Map<String, Object> getCandidato(Integer id_vacante, Integer id_persona){
        var candidato = canRepository.findById(CandidatoId.builder()
                .vacante(vacRepository.findById(id_vacante).orElseThrow())
                .persona(perRepository.findById(id_persona.longValue()).orElseThrow())
                .build()).orElseThrow();

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");
        responseMap.put("candidato", CandidatoMap(candidato));

        return responseMap;
    }

    public Map<String, Object> updateCandidato(Map<String, Object> request){
        var candidato = canRepository.findById(CandidatoId.builder()
                .vacante(vacRepository.findById((Integer)request.get("id_vacante")).orElseThrow())
                .persona(perRepository.findById(((Number)request.get("id_persona")).longValue()).orElseThrow())
                .build()).orElseThrow();

        @SuppressWarnings("unchecked")
        Map<String,Object> contratoRequest = (Map<String, Object>) request.get("contrato_persona");

        var salarioReq = BigDecimal.valueOf((Double)contratoRequest.get("salario"));
        var auxilioTransporte = BigDecimal.ZERO;

        if(salarioReq.compareTo(BigDecimal.valueOf(2600000.00)) < 0){
            auxilioTransporte = BigDecimal.valueOf(162000);
        }

        if ((request.get("accion")).equals("CONTRATAR")){
            var contrato = ContratoPersona.builder()
                    .persona(candidato.getId().getPersona())
                    .cargo(candidato.getId().getVacante().getCargo())
                    .salario(null)
                    .sucursal(sucRepository.findById((Integer)contratoRequest.get("id_sucursal")).orElseThrow())
                    .tipo(Tipo.valueOf((String) contratoRequest.get("tipo")))
                    .fecha_inicio(stringToDate((String) contratoRequest.get("fecha_inicio")))
                    .fecha_fin(null)
                    .contratacion_mision_plus((Boolean)contratoRequest.get("contratacion_mision_plus"))
                    .ultimo_pago_vacaciones(null)
                    .ultimo_pago_cesantias(null)
                    .estado(Boolean.TRUE)
                    .build();

            var salario = Salario.builder()
                    .contratoPersona(contrato)
                    .salario(salarioReq)
                    .auxilio_transporte(auxilioTransporte)
                    .build();

            salRepository.save(salario);
            contrato.setSalario(salario);
            conPerRepository.save(contrato);
        }

        candidato.setEstado(Boolean.FALSE);
        canRepository.save(candidato);
        return Map.of("message", "OK");
    }

    private Date stringToDate(String date){
        try {
            return new SimpleDateFormat("yyyy-MM-dd").parse(date);
        } catch (ParseException e) {
            return null;
        }
    }

    private Map<String, Object> CandidatoMap(Candidato candidato){
        Map<String, Object> candidatoMap = new HashMap<>();
        candidatoMap.put("id_vacante", candidato.getId().getVacante().getId());
        candidatoMap.put("id_persona", candidato.getId().getPersona().getId());
        candidatoMap.put("dni", candidato.getId().getPersona().getDni());
        candidatoMap.put("nombre_completo", candidato.getId().getPersona().getNombre1() + " " +
                Optional.ofNullable(candidato.getId().getPersona().getNombre2()).map(n -> " " + n).orElse("") + " " +
                candidato.getId().getPersona().getApellido1() +
                Optional.ofNullable(candidato.getId().getPersona().getApellido2()).map(a -> " " + a).orElse(""));
        candidatoMap.put("email", candidato.getId().getPersona().getEmail());
        candidatoMap.put("titulo_vacante", candidato.getId().getVacante().getTitulo());
        candidatoMap.put("nombre_cargo", candidato.getId().getVacante().getCargo().getNombre());
        candidatoMap.put("estado", candidato.getEstado());
        return candidatoMap;
    }
}
