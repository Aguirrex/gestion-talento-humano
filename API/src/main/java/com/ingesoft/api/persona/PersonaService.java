package com.ingesoft.api.persona;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Comparator;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class PersonaService {

    private final PersonaRepository personaRepository;

    public Map<String, Object> createPersona(Map<String, Object> request) {
        var persona = Persona.builder()
                .dni(request.get("dni").toString())
                .tipo(Tipo.valueOf(request.get("tipo_documento").toString()))
                .nombre1(request.get("nombre1").toString())
                .nombre2(request.get("nombre2") == null ? null : request.get("nombre2").toString())
                .apellido1(request.get("apellido1").toString())
                .apellido2(request.get("apellido2") == null ? null : request.get("apellido2").toString())
                .direccion(request.get("direccion").toString())
                .telefono(request.get("telefono") == null ? null : request.get("telefono").toString())
                .celular(request.get("celular").toString())
                .email(request.get("email").toString())
                .build();

        personaRepository.save(persona);

        return Map.of(
                "message", "OK",
                "persona", PersonaMap(persona));
    }

    public Map<String, Object> getPersonas() {
        var personas = personaRepository.findAll();

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");
        responseMap.put("personas", personas.stream().map(this::PersonaMap));

        return responseMap;
    }

    public Map<String, Object> getPersona(Long id) {
        var persona = personaRepository.findById(id).orElseThrow();

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");
        responseMap.put("persona", PersonaMap(persona));

        return responseMap;
    }

    public Map<String, Object> siguienteId() {
        var persona = personaRepository.findAll().stream().max(Comparator.comparingLong(Persona::getId)).orElseThrow();

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");
        responseMap.put("siguiente_id_personas", persona.getId() + 1);

        return responseMap;
    }

    public Map<String, Object> updatePersona(Map<String, Object> request, Long id) {
        var persona = personaRepository.findById(id).orElseThrow();
        persona.setDni(request.get("dni").toString());
        persona.setTipo(request.get("tipo_documento") != null ? Tipo.valueOf(request.get("tipo_documento").toString()) : null);
        persona.setNombre1(request.get("nombre1") != null ? request.get("nombre1").toString() : null);
        persona.setNombre2(request.get("nombre2") != null ? request.get("nombre2").toString() : null);
        persona.setApellido1(request.get("apellido1") != null ? request.get("apellido1").toString() : null);
        persona.setApellido2(request.get("apellido2") != null ? request.get("apellido2").toString() : null);
        persona.setDireccion(request.get("direccion") != null ? request.get("direccion").toString() : null); 
        persona.setTelefono(request.get("telefono") != null ? request.get("telefono").toString() : null); //Por si el valor que se recibe es nulo para que no haya un error al hacer toString a un valor nulo se pone el valor como nulo
        persona.setCelular(request.get("celular") != null ? request.get("celular").toString() : null);
        persona.setEmail(request.get("email") != null ? request.get("email").toString() : null);
        personaRepository.save(persona);

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");
        responseMap.put("persona", PersonaMap(persona));

        return responseMap;
    }

    public Map<String, Object> deletePersona(Long id) {
        var persona = personaRepository.findById(id).orElseThrow();
        personaRepository.delete(persona);

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");

        return responseMap;
    }

    private Map<String, Object> PersonaMap(Persona persona) {
        Map<String, Object> personaMap = new HashMap<>();
        personaMap.put("id", persona.getId());
        personaMap.put("dni", persona.getDni());
        personaMap.put("tipo_documento", persona.getTipo());
        personaMap.put("nombre_completo",
                persona.getNombre1() + " " +
                        (persona.getNombre2() == null ? "" : persona.getNombre2() + " ") +
                        persona.getApellido1() + " " +
                        (persona.getApellido2() == null ? "" : persona.getApellido2()));
        personaMap.put("nombre1", persona.getNombre1());
        personaMap.put("nombre2", persona.getNombre2());
        personaMap.put("apellido1", persona.getApellido1());
        personaMap.put("apellido2", persona.getApellido2());
        personaMap.put("direccion", persona.getDireccion());
        personaMap.put("telefono", persona.getTelefono());
        personaMap.put("celular", persona.getCelular());
        personaMap.put("email", persona.getEmail());
        return personaMap;
    }
}
