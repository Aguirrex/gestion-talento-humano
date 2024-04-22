package com.ingesoft.api.salarios;

import jakarta.persistence.*;
import java.math.BigDecimal;
import com.ingesoft.api.contratos_personas.ContratosPersonas;

@Entity
@Table(name = "salarios")
public class Salarios {
    @Id
    @Column(name = "id_contrato")
    private Long idContrato;

    @OneToOne(mappedBy = "salario")
    private ContratosPersonas contratosPersonas;

    @Column(name = "salario", precision = 11, scale = 2, nullable = false)
    private BigDecimal salario;

    @Column(name = "auxilio_transporte", precision = 10, scale = 2, nullable = false)
    private BigDecimal auxilioTransporte;
}
