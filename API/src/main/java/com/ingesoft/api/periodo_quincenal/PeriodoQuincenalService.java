package com.ingesoft.api.periodo_quincenal;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PeriodoQuincenalService {

    private final PeriodoQuincenalRepository periodoQuincenalRepository;

    public Map<String, Object> getPeriodosQuincenales() {
        var periodosQuincenales = periodoQuincenalRepository.findAll();

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "OK");
        responseMap.put("periodos_quincenales", periodosQuincenales.stream().map(this::PeriodoQuincenalMap));

        return responseMap;
    }

    public Map<String, Object> PeriodoQuincenalMap(PeriodoQuincenal periodoQuincenal) {
        Map<String, Object> periodoQuincenalMap = new HashMap<>();
        periodoQuincenalMap.put("id", periodoQuincenal.getId());
        periodoQuincenalMap.put("year", periodoQuincenal.getYear());
        periodoQuincenalMap.put("mes", periodoQuincenal.getMes());
        periodoQuincenalMap.put("periodo", periodoQuincenal.getPeriodo());
        return periodoQuincenalMap;
    }

}
