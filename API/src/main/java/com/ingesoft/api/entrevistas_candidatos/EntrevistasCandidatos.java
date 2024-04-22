package com.ingesoft.api.entrevistas_candidatos;

import jakarta.persistence.*;
import com.ingesoft.api.contratos_personas.ContratosPersonas;

@Entity
@Table(name = "entrevistas_candidatos")
public class EntrevistasCandidatos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "id_candidato", nullable = false)
    private Integer idCandidato;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Tipo tipo;

    @ManyToOne
    @JoinColumn(name = "id_responsable", referencedColumnName = "id")
    private ContratosPersonas contratosPersonas;

    @Column(length = 255, nullable = true)
    private String url_soporte;
}
