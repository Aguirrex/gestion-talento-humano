package com.ingesoft.api.afiliaciones_sociales;

import com.ingesoft.api.tipos_afiliaciones.TiposAfiliaciones;

import jakarta.persistence.*;
import com.ingesoft.api.contratos_personas.ContratosPersonas;

@Entity
@Table(name = "afiliaciones_sociales")
public class AfiliacionesSociales {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_contrato", nullable = false)
    private ContratosPersonas idContrato;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tipo_afiliacion", nullable = false)
    private TiposAfiliaciones idTipoAfiliacion;

    @Column(length = 255, nullable = false)
    private String urlSoporte;

    @Column(nullable = false)
    private Boolean estado;
}
