package com.ingesoft.api.vacante;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ingesoft.api.cargo.Cargo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Vacante {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cargo", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Cargo cargo;

    @Column(length = 100, nullable = false)
    private String titulo;

    @Column(length = 255, nullable = false)
    private String descripcion;

    @Column(length = 255, nullable = true)
    private String url_perfil;

    @Column(nullable = false)
    private Boolean estado;

    @Column(nullable = false)
    private Date fecha_apertura;

    @Column(nullable = true)
    private Date fecha_cierre;


}
