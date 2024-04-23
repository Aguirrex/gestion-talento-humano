package com.ingesoft.api.documentos_persona;

import com.ingesoft.api.persona.Persona;
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
@Table(name = "documentos_personas")
public class DocumentosPersona {

    @Id
    @Column(name = "id_persona", columnDefinition = "BIGINT UNSIGNED")
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id_persona", columnDefinition = "BIGINT UNSIGNED")
    private Persona persona;


    @Column(length = 255, nullable = false)
    private String url_documento;

    @Column(length = 255, nullable = true)
    private String url_libreta_militar;

    @Column(length = 255, nullable = false)
    private String url_cv;

    @Column(length = 255, nullable = false)
    private String url_eps;

    @Column(length = 255, nullable = false)
    private String url_pension;

}
