package com.ingesoft.api.periodo_quincenal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "periodos_quincenales")
public class PeriodoQuincenal {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(nullable = false)
    private Short year;

    @Column(nullable = false)
    private Short mes;

    @Column(nullable = false)
    private Short periodo;

    @Column(nullable = false)
    private Date fecha_inicio;

    @Column(nullable = false)
    private Date fecha_fin;

    @Column(nullable = false)
    private Short num_dias;

    @Column(nullable = false)
    private Short horas;

    @Column(nullable = false)
    private Boolean liquidado;
}
