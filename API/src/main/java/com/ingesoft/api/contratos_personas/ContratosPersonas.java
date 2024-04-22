package com.ingesoft.api.contratos_personas;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import com.ingesoft.api.entrevistas_candidatos.EntrevistasCandidatos;
import com.ingesoft.api.afiliaciones_sociales.AfiliacionesSociales;
import com.ingesoft.api.salarios.Salarios;
import com.ingesoft.api.novedades_nomina.NovedadesNomina;
import com.ingesoft.api.liquidaciones_definitivas.LiquidacionesDefinitivas;
import com.ingesoft.api.citas_medicas.CitasMedicas;

@Entity
@Table(name = "contratos_personas")
public class ContratosPersonas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "contratosPersonas", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EntrevistasCandidatos> entrevistasCandidatos = new ArrayList<>();

    @OneToMany(mappedBy = "idContrato", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AfiliacionesSociales> afiliacionesSociales = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "id", referencedColumnName = "id_contrato")
    private Salarios salario;

    @OneToOne
    @JoinColumn(name = "id", referencedColumnName = "id_contrato")
    private LiquidacionesDefinitivas liquidacionesDefinitivas;

    @OneToMany(mappedBy = "idContrato")
    private List<NovedadesNomina> novedadesNomina;

    @OneToMany(mappedBy = "contratosPersonas")
    private List<CitasMedicas> citasMedicas;

    @Column(name = "id_persona", nullable = false)
    private Long idPersona;

    @Column(name = "id_cargo", nullable = false)
    private Integer idCargo;

    @Column(name = "id_sucursal", nullable = false)
    private Integer idSucursal;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "enum", nullable = false)
    private Tipo tipo;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin", nullable = true)
    private LocalDate fechaFin;

    @Column(name = "contratacion_mision_plus", nullable = false)
    private Boolean contratacionMisionPlus;

    @Column(name = "ultimo_pago_vacaciones", nullable = true)
    private LocalDate ultimoPagoVacaciones;

    @Column(name = "ultimo_pago_cesantias", nullable = true)
    private LocalDate ultimoPagoCesantias;

    @Column(name = "estado", nullable = false)
    private Boolean estado;

}