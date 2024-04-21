package com.ingesoft.api.liquidaciones_definitivas;


import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import com.ingesoft.api.contratos_personas.ContratosPersonas;

@Entity
@Table(name = "liquidaciones_definitivas")
public class LiquidacionesDefinitivas {
    @Id
    @OneToOne
    @JoinColumn(name = "id_contrato", nullable = false)
    private ContratosPersonas contratosPersonas;

    @Column(name = "fecha_retiro", nullable = false)
    private LocalDate fechaRetiro;

    @Column(name = "fecha_pago", nullable = false)
    private LocalDate fechaPago;

    @Column(name = "valor_vacaciones", precision = 12, scale = 2, nullable = false)
    private BigDecimal valorVacaciones;

    @Column(name = "valor_cesantias", precision = 10, scale = 2, nullable = false)
    private BigDecimal valorCesantias;

    @Column(name = "valor_intereses_ces", precision = 10, scale = 2, nullable = false)
    private BigDecimal valorInteresesCes;

    @Column(name = "valor_primas", precision = 12, scale = 2, nullable = false)
    private BigDecimal valorPrimas;
}
