package com.ingesoft.api.persona;

import com.ingesoft.api.documentos_persona.DocumentosPersona;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "personas")
public class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "BIGINT UNSIGNED")
    private Long id;

    @OneToOne(mappedBy = "persona",cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private DocumentosPersona documentosPersona;

    @Column(unique = true, length = 15, nullable = false)
    private String dni;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Tipo tipo;

    @Column(length = 50, nullable = false)
    private String nombre1;

    @Column(length = 50, nullable = true)
    private String nombre2;

    @Column(length = 50, nullable = false)
    private String apellido1;

    @Column(length = 50, nullable = true)
    private String apellido2;

    @Column(length = 100, nullable = false)
    private String direccion;

    @Column(length = 7, nullable = true)
    private String telefono;

    @Column(length = 10, nullable = false)
    private String celular;

    @Column(unique = true, length = 100, nullable = false)
    private String email;




}
