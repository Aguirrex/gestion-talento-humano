package com.ingesoft.api.candidato;

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
@Table(name = "candidatos")
public class Candidato {

    @EmbeddedId
    private CandidatoId id;


    @Column(nullable = false)
    private Boolean estado;
}
