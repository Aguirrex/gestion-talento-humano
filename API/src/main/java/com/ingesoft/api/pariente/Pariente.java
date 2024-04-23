package com.ingesoft.api.pariente;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ingesoft.api.persona.Persona;
import jakarta.persistence.*;
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
@Table(name = "parientes")
public class Pariente {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_persona", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Persona persona;

    @Column(length = 50, nullable = false)
    private String nombre1;

    @Column(length = 50, nullable = true)
    private String nombre2;

    @Column(length = 50, nullable = false)
    private String apellido1;

    @Column(length = 50, nullable = true)
    private String apellido2;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Tipo tipo;

    @Column(length = 255, nullable = true)
    private String url_soporte;

    @Column(nullable = false)
    private Boolean estado;


}
