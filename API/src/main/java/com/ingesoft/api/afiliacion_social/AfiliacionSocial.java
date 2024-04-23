package com.ingesoft.api.afiliacion_social;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ingesoft.api.tipo_afiliacion.TipoAfiliacion;

import jakarta.persistence.*;
import com.ingesoft.api.contrato_persona.ContratoPersona;
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
@Table(name = "afiliaciones_sociales")
public class AfiliacionSocial {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_contrato", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private ContratoPersona contrato_persona;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tipo_afiliacion", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private TipoAfiliacion tipo_afiliacion;

    @Column(length = 255, nullable = false)
    private String url_soporte;

    @Column(nullable = false)
    private Boolean estado;
}
