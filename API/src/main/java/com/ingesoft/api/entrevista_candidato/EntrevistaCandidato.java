package com.ingesoft.api.entrevista_candidato;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ingesoft.api.candidato.Candidato;
import jakarta.persistence.*;
import com.ingesoft.api.contrato_persona.ContratoPersona;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "entrevistas_candidatos")
public class EntrevistaCandidato {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "id_vacante", referencedColumnName = "id_vacante"),
            @JoinColumn(name = "id_persona", referencedColumnName = "id_persona")
    })
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Candidato candidato;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Tipo tipo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_responsable", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private ContratoPersona contratoPersona;

    @Column(length = 255, nullable = true)
    private String url_soporte;
}
