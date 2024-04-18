package com.ingesoft.api.persona;


import jakarta.persistence.*;

@Entity
@Table
public class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long id;

    @Column(unique = true, length = 15, nullable = false)
    private String dni;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoDocumento tipoDocumento;

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
