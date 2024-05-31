package com.ingesoft.api.nomina;

import com.ingesoft.api.contrato_persona.ContratoPersona;
import com.ingesoft.api.contrato_persona.ContratoPersonaRepository;
import com.ingesoft.api.novedad_nomina.NovedadNomina;
import com.ingesoft.api.novedad_nomina.NovedadNominaRepository;
import com.ingesoft.api.novedad_nomina.Tipo;
import com.ingesoft.api.periodo_quincenal.PeriodoQuincenalRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
public class NominaService {
    private final PeriodoQuincenalRepository periodoQuincenalRepository;
    private final ContratoPersonaRepository contratoPersonaRepository;
    private final NovedadNominaRepository novedadNominaRepository;

    public Map<String, Object> createNomina(Map<String, Object> request) {
        var periodo = periodoQuincenalRepository.findById((Integer) request.get("id_periodo_quincenal")).orElseThrow();
        var empleados = contratoPersonaRepository.findAll().stream()
                .filter(ContratoPersona::getEstado).toList();
        var novedadesPeriodoActual = novedadNominaRepository.findAll().stream()
                .filter(c -> c.getPeriodoQuincenal() == periodo).toList();

        AtomicInteger rowCounter = new AtomicInteger(1);
        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("Hoja1");

        Row row1 = sheet.createRow(0);
        Cell cell1 = row1.createCell(0);
        cell1.setCellValue("Periodo quincenal: " + periodo.getFecha_inicio() + " - " + periodo.getFecha_fin());
        applyBorderStyle(cell1);

        empleados.forEach(empleado -> {
            rowCounter.addAndGet(2);
            Row row = sheet.createRow(rowCounter.getAndIncrement());
            Cell cell = row.createCell(0);
            cell.setCellValue(getEmpleadoNombreCompleto(empleado));
            applyBorderStyle(cell);
            rowCounter.incrementAndGet();
            crearEncabezados(sheet, rowCounter);

            crearFilaDetalle(sheet, rowCounter, "SALARIO", empleado.getPersona().getDni(), periodo.getHoras(), "C", 5531);
            crearFilaDetalle(sheet, rowCounter, "AUXILIO DE TRANSPORTE", empleado.getPersona().getDni(), periodo.getHoras(), "C", 3446.80);

            var novedadesEmpleado = novedadesPeriodoActual.stream()
                    .filter(n -> n.getContratoPersona() == empleado).toList();

            crearFilaNovedades(sheet, rowCounter, novedadesEmpleado, Tipo.RODAMIENTO, "AUXILIO DE RODAMIENTO", empleado.getPersona().getDni());
            crearFilaNovedades(sheet, rowCounter, novedadesEmpleado, Tipo.HORAS_EXTRAS, "HORAS EXTRAS", empleado.getPersona().getDni());
            crearFilaNovedades(sheet, rowCounter, novedadesEmpleado, Tipo.FONDO_CRECER, "FONDO CRECER", empleado.getPersona().getDni());
            crearFilaNovedades(sheet, rowCounter, novedadesEmpleado, Tipo.COMISIÓN, "COMISIÓN", empleado.getPersona().getDni());
            crearFilaNovedades(sheet, rowCounter, novedadesEmpleado, Tipo.BONIFICACIÓN, "BONIFICACIÓN", empleado.getPersona().getDni());
            crearFilaNovedades(sheet, rowCounter, novedadesEmpleado, Tipo.PRIMA, "PRIMA", empleado.getPersona().getDni());
            crearFilaNovedades(sheet, rowCounter, novedadesEmpleado, Tipo.INCAPACIDAD, "INCAPACIDAD", empleado.getPersona().getDni());
            crearFilaNovedades(sheet, rowCounter, novedadesEmpleado, Tipo.VACACIONES, "VACACIONES", empleado.getPersona().getDni());
            crearFilaNovedades(sheet, rowCounter, novedadesEmpleado, Tipo.OTRO, "OTRO", empleado.getPersona().getDni());

            calcularTotales(sheet, rowCounter);

        });

        //autosize
        autoSizeColumns(sheet);

        String tempDir = System.getProperty("java.io.tmpdir");

        try (FileOutputStream outputStream = new FileOutputStream(tempDir+ "/nomina"+periodo.getId()+".xlsx")) {
            workbook.write(outputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return Map.of("message", "OK");
    }

//    public Map<String, Object> getNominas() {
//        var nominas = periodoQuincenalRepository.findAll();
//
//        Map<String, Object> responseMap = new HashMap<>();
//        responseMap.put("message", "OK");
//        responseMap.put("nominas", nominas.stream().map(this::NominaMap));
//
//        return responseMap;
//    }


    private void crearEncabezados(XSSFSheet sheet, AtomicInteger rowCounter) {
        Row rowHeaders = sheet.createRow(rowCounter.getAndIncrement());
        String[] headers = {"Descripción", "CC", "Cantidad", "Devengados", "Deducidos"};
        for (int i = 0; i < headers.length; i++) {
            Cell cell = rowHeaders.createCell(i);
            cell.setCellValue(headers[i]);

            // Aplicar estilo para centrar texto
            XSSFCellStyle style = (XSSFCellStyle) sheet.getWorkbook().createCellStyle();
            style.setAlignment(HorizontalAlignment.CENTER);
            cell.setCellStyle(style);

            // Aplicar bordes a la celda
            applyBorderStyle(cell);


        }
    }

    private void autoSizeColumns(XSSFSheet sheet) {
        for (int columnIndex = 0; columnIndex < sheet.getRow(0).getPhysicalNumberOfCells(); columnIndex++) {
            sheet.autoSizeColumn(columnIndex);
        }
    }

    private void applyBorderStyle(Cell cell) {
        XSSFWorkbook workbook = (XSSFWorkbook) cell.getSheet().getWorkbook();
        XSSFFont font = workbook.createFont();
        font.setFontHeightInPoints((short) 10);
        font.setFontName("Arial");

        XSSFCellStyle style = workbook.createCellStyle();
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setFont(font);

        cell.setCellStyle(style);
    }

    private void crearFilaDetalle(XSSFSheet sheet, AtomicInteger rowCounter, String descripcion, String dni, int horas, String columnaHoras, double multiplicador) {
        Row row = sheet.createRow(rowCounter.getAndIncrement());
        row.createCell(0).setCellValue(descripcion);
        row.createCell(1).setCellValue(dni);
        row.createCell(2).setCellValue(horas);
        row.createCell(3).setCellFormula(columnaHoras + rowCounter.get() + "*" + multiplicador);
    }

    private void crearFilaNovedades(XSSFSheet sheet, AtomicInteger rowCounter, List<NovedadNomina> novedadesEmpleado, Tipo tipo, String descripcion, String dni) {
        var novedades = novedadesEmpleado.stream().filter(n -> n.getTipo().equals(tipo)).toList();
        int cantidad = novedades.stream().mapToInt(NovedadNomina::getCantidad).sum();
        int totalDevengados = novedades.stream().filter(n -> !n.getEs_descuento())
                .mapToInt(n -> n.getCantidad() * n.getValor().intValue()).sum();
        int totalDeducidos = novedades.stream().filter(NovedadNomina::getEs_descuento)
                .mapToInt(n -> n.getCantidad() * n.getValor().intValue()).sum();

        Row row = sheet.createRow(rowCounter.getAndIncrement());
        row.createCell(0).setCellValue(descripcion);
        row.createCell(1).setCellValue(dni);
        row.createCell(2).setCellValue(cantidad);
        row.createCell(3).setCellValue(totalDevengados);
        row.createCell(4).setCellValue(totalDeducidos);
    }

    private void calcularTotales(XSSFSheet sheet, AtomicInteger rowCounter) {
        rowCounter.getAndIncrement();
        Row rowTotal = sheet.createRow(rowCounter.getAndIncrement());
        rowTotal.createCell(0).setCellValue("Totales -->");
        rowTotal.createCell(3).setCellFormula("SUM(D" + (rowCounter.get() - 12) + ":D" + (rowCounter.get() - 2) + ")");
        rowTotal.createCell(4).setCellFormula("SUM(E" + (rowCounter.get() - 12) + ":E" + (rowCounter.get() - 2) + ")");

        Row rowNeto = sheet.createRow(rowCounter.getAndIncrement());
        rowNeto.createCell(0).setCellValue("Neto a pagar");
        rowNeto.createCell(3).setCellFormula("D" + (rowCounter.get() - 1) + "-E" + (rowCounter.get() - 1));

        // Aplicar bordes a las celdas
        applyBorderStyle(rowTotal.getCell(0));
        applyBorderStyle(rowTotal.getCell(3));
        applyBorderStyle(rowTotal.getCell(4));
        applyBorderStyle(rowNeto.getCell(0));
        applyBorderStyle(rowNeto.getCell(3));
    }

    private String getEmpleadoNombreCompleto(ContratoPersona empleado) {
        return empleado.getPersona().getNombre1() + " " +
                (empleado.getPersona().getNombre2() == null ? "" : empleado.getPersona().getNombre2() + " ") +
                empleado.getPersona().getApellido1() + " " +
                (empleado.getPersona().getApellido2() == null ? "" : empleado.getPersona().getApellido2());
    }
}
