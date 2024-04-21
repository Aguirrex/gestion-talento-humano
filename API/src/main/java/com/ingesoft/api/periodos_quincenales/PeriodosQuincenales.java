package com.ingesoft.api.periodos_quincenales;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "periodos_quincenales")
public class PeriodosQuincenales {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "year", nullable = false)
    private Short year;

    @Column(name = "mes", nullable = false)
    private Short mes;

    @Column(name = "periodo", nullable = false)
    private Short periodo;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin", nullable = false)
    private LocalDate fechaFin;

    @Column(name = "num_dias", nullable = false)
    private Short numDias;

    @Column(name = "horas", nullable = false)
    private Short horas;

    @Column(name = "liquidado", nullable = false)
    private Boolean liquidado;
}
