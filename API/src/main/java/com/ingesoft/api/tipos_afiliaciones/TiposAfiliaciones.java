package com.ingesoft.api.tipos_afiliaciones;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "tipos_afiliaciones")
public class TiposAfiliaciones {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(length = 100, nullable = false)
    private String nombre;

    @Column(precision = 3, scale = 1, nullable = true)
    private BigDecimal porcentajeDescuento;

    @Column(precision = 11, scale = 2, nullable = true)
    private BigDecimal valorDescuento;

    @Column(nullable = false)
    private Boolean estado;
}
