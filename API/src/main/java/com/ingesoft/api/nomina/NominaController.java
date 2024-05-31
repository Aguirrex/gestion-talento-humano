package com.ingesoft.api.nomina;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class NominaController {

    private final NominaService service;

    @PostMapping("/nomina")
    public ResponseEntity<?> createNomina(@RequestBody Map<String, Object> request){
        try {
            return ResponseEntity.ok(service.createNomina(request));
        } catch (Exception e){
            System.out.println(e);
            return ResponseEntity.badRequest().body(Map.of("message", "ERR_NOMINA_DATA"));
        }
    }

    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<FileSystemResource> serveFile(@PathVariable String filename) {
        String tempDir = System.getProperty("java.io.tmpdir");
        Path filePath = Paths.get(tempDir, filename);

        if (Files.exists(filePath)) {
            FileSystemResource resource = new FileSystemResource(filePath.toFile());
            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=\"" + filename + "\"")
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

//    @GetMapping("nominas")
//    public Map<String, Object> getNominas(){
//        try {
//            return service.getNominas();
//        } catch (Exception e){
//            System.out.println(e);
//            return Map.of("message", "ERR_NOMINA_DATA");
//        }
//    }
}
