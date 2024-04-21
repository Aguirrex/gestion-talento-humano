package com.ingesoft.api.citas_medicas;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.ingesoft.api.contratos_personas.ContratosPersonas;

@Entity
@Table(name = "citas_medicas")
public class CitasMedicas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_contrato", referencedColumnName = "id")
    private ContratosPersonas contratosPersonas;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "enum", nullable = false)
    private Tipo tipo;

    @Column(name = "fecha_hora", nullable = false)
    private LocalDateTime fechaHora;

    @Column(name = "url_resultados", length = 255, nullable = true)
    private String urlResultados;
}
