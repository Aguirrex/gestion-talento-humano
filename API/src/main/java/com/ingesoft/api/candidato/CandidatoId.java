package com.ingesoft.api.candidato;

import com.ingesoft.api.persona.Persona;
import com.ingesoft.api.vacante.Vacante;
import jakarta.persistence.*;
import lombok.Data;
import java.io.Serializable;

@Data
@Embeddable
public class CandidatoId implements Serializable{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_vacante", nullable = false)
    private Vacante vacante;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_persona", nullable = false)
    private Persona persona;
}
