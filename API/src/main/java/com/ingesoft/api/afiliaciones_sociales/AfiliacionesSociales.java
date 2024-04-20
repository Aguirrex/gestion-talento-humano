package com.ingesoft.api.afiliaciones_sociales;

import com.ingesoft.api.tipos_afiliaciones.TiposAfiliaciones;

import jakarta.persistence.*;

@Entity
@Table(name = "afiliaciones_sociales")
public class AfiliacionesSociales {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long id;

    @Column(name = "id_contrato", columnDefinition = "BIGINT UNSIGNED", nullable = false)
    private Long idContrato;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tipo_afiliacion", nullable = false)
    private TiposAfiliaciones idTipoAfiliacion;

    @Column(length = 255, nullable = false)
    private String urlSoporte;

    @Column(nullable = false)
    private Boolean estado;
}
