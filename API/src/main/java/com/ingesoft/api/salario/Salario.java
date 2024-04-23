package com.ingesoft.api.salario;

import jakarta.persistence.*;
import java.math.BigDecimal;
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
@Table(name = "salarios")
public class Salario {

    @Id
    @Column(name = "id_contrato", columnDefinition = "BIGINT UNSIGNED")
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id_contrato", columnDefinition = "BIGINT UNSIGNED")
    private ContratoPersona contratoPersona;

    @Column(precision = 11, scale = 2, nullable = false)
    private BigDecimal salario;

    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal auxilio_transporte;
}
