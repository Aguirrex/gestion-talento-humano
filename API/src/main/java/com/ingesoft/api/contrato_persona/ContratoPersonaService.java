package com.ingesoft.api.contrato_persona;

import com.ingesoft.api.cargo.CargoRepository;
import com.ingesoft.api.novedad_nomina.NovedadNomina;
import com.ingesoft.api.persona.PersonaRepository;
import com.ingesoft.api.salario.Salario;
import com.ingesoft.api.salario.SalarioRepository;
import com.ingesoft.api.sucursal.SucursalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static java.lang.Integer.parseInt;

@Service
@RequiredArgsConstructor
public class ContratoPersonaService {

    private final ContratoPersonaRepository contratoPersonaRepository;
    private final PersonaRepository personaRepository;
    private final CargoRepository cargoRepository;
    private final SucursalRepository sucursalRepository;
    private final SalarioRepository salarioRepository;

    public Map<String, Object> createEmpleado(Map<String, Object> request) {

        var cargo = cargoRepository.findById(parseInt(request.get("id_cargo").toString())).orElseThrow();
        var persona = personaRepository.findById(Long.valueOf((Integer)(request.get("id_persona")))).orElseThrow();
        var sucursal = sucursalRepository.findById(parseInt(request.get("id_sucursal").toString())).orElseThrow();

        BigDecimal salarioValue = BigDecimal.valueOf(Long.parseLong(request.get("salario").toString()));
        BigDecimal auxilio_transporte;

        if (salarioValue.compareTo(BigDecimal.valueOf(2600000)) <= 0) {
            auxilio_transporte = BigDecimal.valueOf(160000);
        } else {
            auxilio_transporte = BigDecimal.ZERO;
        }

        var empleado = ContratoPersona.builder()
                .salario(null)
                .persona(persona)
                .cargo(cargo)
                .sucursal(sucursal)
                .tipo(Tipo.valueOf(request.get("tipo").toString()))
                .fecha_inicio(stringToDate((String) request.get("fecha_inicio")))
                .fecha_fin(null)
                .contratacion_mision_plus(false)
                .ultimo_pago_vacaciones(null)
                .ultimo_pago_cesantias(null)
                .estado(Boolean.TRUE)
                .build();

        Salario salario = Salario.builder()
                .contratoPersona(empleado)
                .salario(salarioValue)
                .auxilio_transporte(auxilio_transporte)
                .build();

        salarioRepository.save(salario);
        empleado.setSalario(salario);
        contratoPersonaRepository.save(empleado);

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");
        responseMap.put("candidato", EmpleadoMap(empleado));

        return responseMap;
    }

    private Date stringToDate(String date){
        try {
            return new SimpleDateFormat("yyyy-MM-dd").parse(date);
        } catch (ParseException e) {
            return null;
        }
    }

    public Map<String, Object> getEmpleados() {
        var empleados = contratoPersonaRepository.findAll();

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");
        responseMap.put("empleados", empleados.stream().map(this::EmpleadoMap));

        return responseMap;
    }

    public Map<String, Object> getEmpleado(Long id) {
        var empleado = contratoPersonaRepository.findById(id).orElseThrow();

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");
        responseMap.put("empleado", EmpleadoMap(empleado));

        return responseMap;
    }

    public Map<String, Object> siguienteId() {
        var empleado = contratoPersonaRepository.findAll().stream()
                .max(Comparator.comparingLong(ContratoPersona::getId)).orElseThrow();

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");
        responseMap.put("siguiente_id_empleados", empleado.getId() + 1);

        return responseMap;
    }

    public Map<String, Object> updateEmpleado(Map<String, Object> request, Long id) {
        var empleado = contratoPersonaRepository.findById(id).orElseThrow();
        BigDecimal salarioValue = BigDecimal.valueOf(((Number) request.get("salario")).doubleValue());
        BigDecimal auxilio_transporte;

        if (salarioValue.compareTo(BigDecimal.valueOf(2600000)) <= 0) {
            auxilio_transporte = BigDecimal.valueOf(160000);
        } else {
            auxilio_transporte = BigDecimal.ZERO;
        }

        Salario salario;
        if (salarioRepository.existsById(id)) {
            salario = salarioRepository.findById(id).get();
            salario.setSalario(salarioValue);
            salario.setAuxilio_transporte(auxilio_transporte);
        } else {
            salario = Salario.builder()
                    .contratoPersona(empleado)
                    .salario(salarioValue)
                    .auxilio_transporte(auxilio_transporte)
                    .build();
        }

        salarioRepository.save(salario);
        empleado.setSalario(salario);
        contratoPersonaRepository.save(empleado);

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");
        responseMap.put("empleado", EmpleadoMap(empleado));

        return responseMap;
    }

    private Map<String, Object> EmpleadoMap(ContratoPersona empleado) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String fechaInicioString = empleado.getFecha_inicio().toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate()
                .format(formatter);

        Map<String, Object> empleadoMap = new HashMap<>();
        empleadoMap.put("id", empleado.getId());
        empleadoMap.put("id_persona", empleado.getPersona().getId());
        empleadoMap.put("id_sucursal", empleado.getSucursal().getId());
        empleadoMap.put("dni", empleado.getPersona().getDni());
        empleadoMap.put("nombre_completo",
                empleado.getPersona().getNombre1() + " " +
                        (empleado.getPersona().getNombre2() == null ? "" : empleado.getPersona().getNombre2() + " ") +
                        empleado.getPersona().getApellido1() + " " +
                        (empleado.getPersona().getApellido2() == null ? "" : empleado.getPersona().getApellido2()));
        empleadoMap.put("id_cargo", empleado.getCargo().getId());
        empleadoMap.put("nombre_cargo", empleado.getCargo().getNombre());
        empleadoMap.put("tipo", empleado.getTipo().toString());
        empleadoMap.put("fecha_inicio", fechaInicioString);
        empleadoMap.put("fecha_fin", empleado.getFecha_fin());
        empleadoMap.put("salario", empleado.getSalario().getSalario());
        empleadoMap.put("estado", empleado.getEstado());

//        Map<String, Object> responseMap = new HashMap<>();
//        responseMap.put("message", "OK");
//        responseMap.put("empleado", empleadoMap);

        return empleadoMap;
    }
}
