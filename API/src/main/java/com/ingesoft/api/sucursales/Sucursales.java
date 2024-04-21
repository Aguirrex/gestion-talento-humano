package com.ingesoft.api.sucursales;

import jakarta.persistence.*;

@Entity
@Table(name = "sucursales")
public class Sucursales {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre", length = 100, nullable = false)
    private String nombre;

    @Column(name = "estado", nullable = false)
    private Boolean estado;
}