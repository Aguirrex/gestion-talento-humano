package com.ingesoft.api.tipo_afiliacion;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tipos_afiliaciones")
public class TipoAfiliacion {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(length = 100, nullable = false)
    private String nombre;

    @Column(precision = 3, scale = 1, nullable = true)
    private BigDecimal porcentaje_descuento;

    @Column(precision = 11, scale = 2, nullable = true)
    private BigDecimal valor_descuento;

    @Column(nullable = false)
    private Boolean estado;
}
