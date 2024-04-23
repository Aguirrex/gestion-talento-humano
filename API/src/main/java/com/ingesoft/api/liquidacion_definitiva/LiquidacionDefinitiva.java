package com.ingesoft.api.liquidacion_definitiva;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

import com.ingesoft.api.contrato_persona.ContratoPersona;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "liquidaciones_definitivas")
public class LiquidacionDefinitiva {

    @Id
    @Column(name = "id_contrato", columnDefinition = "BIGINT UNSIGNED")
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id_contrato", columnDefinition = "BIGINT UNSIGNED")
    private ContratoPersona contratoPersona;



    @Column(nullable = false)
    private Date fecha_retiro;

    @Column(nullable = false)
    private Date fecha_pago;

    @Column(precision = 12, scale = 2, nullable = false)
    private BigDecimal valor_vacaciones;

    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal valor_cesantias;

    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal valor_intereses_ces;

    @Column(precision = 12, scale = 2, nullable = false)
    private BigDecimal valor_primas;
}
