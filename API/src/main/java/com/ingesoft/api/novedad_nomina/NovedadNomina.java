package com.ingesoft.api.novedad_nomina;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;
import com.ingesoft.api.periodo_quincenal.PeriodoQuincenal;
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
@Table(name = "novedades_nomina")
public class NovedadNomina {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_contrato", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private ContratoPersona contratoPersona;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_periodo_quincenal", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private PeriodoQuincenal periodoQuincenal;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Tipo tipo;

    @Column(nullable = true)
    private Short cantidad;

    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal valor;

    @Column(nullable = false)
    private Boolean es_descuento;

    @Column(length = 100, nullable = true)
    private String detalles;

    @Column(length = 255, nullable = true)
    private String url_soporte;
}