package com.ingesoft.api.novedades_nomina;

import jakarta.persistence.*;
import java.math.BigDecimal;
import com.ingesoft.api.periodos_quincenales.PeriodosQuincenales;
import com.ingesoft.api.contratos_personas.ContratosPersonas;

@Entity
@Table(name = "novedades_nomina")
public class NovedadesNomina {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_contrato", nullable = false)
    private ContratosPersonas contratosPersonas;

    @ManyToOne
    @JoinColumn(name = "id_periodo_quincenal", nullable = false)
    private PeriodosQuincenales idPeriodoQuincenal;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "enum", nullable = false)
    private Tipo tipo;

    @Column(name = "cantidad", nullable = false)
    private Short cantidad;

    @Column(name = "valor", precision = 10, scale = 2, nullable = false)
    private BigDecimal valor;

    @Column(name = "es_descuento" , nullable = false)
    private Boolean esDescuento;

    @Column(name = "detalles", length = 100, nullable = true)
    private String detalles;

    @Column(name = "url_soporte", length = 255, nullable = true)
    private String urlSoporte;
}