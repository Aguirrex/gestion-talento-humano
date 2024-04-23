package com.ingesoft.api.contrato_persona;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ingesoft.api.cargo.Cargo;
import com.ingesoft.api.liquidacion_definitiva.LiquidacionDefinitiva;
import com.ingesoft.api.persona.Persona;
import com.ingesoft.api.salario.Salario;
import com.ingesoft.api.sucursal.Sucursal;
import jakarta.persistence.*;

import java.util.Date;

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
@Table(name = "contratos_personas")
public class ContratoPersona {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "BIGINT UNSIGNED")
    private Long id;

    @OneToOne(mappedBy = "contratoPersona",cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private Salario salario;

    @OneToOne(mappedBy = "contratoPersona",cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private LiquidacionDefinitiva liquidacionDefinitiva;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_persona", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Persona persona;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cargo", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Cargo cargo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_sucursal", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Sucursal sucursal;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Tipo tipo;


    @Column(nullable = false)
    private Date fecha_inicio;

    @Column(nullable = true)
    private Date fecha_fin;

    @Column(nullable = false)
    private Boolean contratacion_mision_plus;

    @Column(nullable = true)
    private Date ultimo_pago_vacaciones;

    @Column(nullable = true)
    private Date ultimo_pago_cesantias;

    @Column(nullable = false)
    private Boolean estado;

}