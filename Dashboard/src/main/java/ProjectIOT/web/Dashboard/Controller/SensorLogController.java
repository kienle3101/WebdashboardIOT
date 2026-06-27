package ProjectIOT.web.Dashboard.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ProjectIOT.web.Dashboard.entity.SensorLog;
import ProjectIOT.web.Dashboard.service.SensorLogService;
import ProjectIOT.web.Dashboard.dto.request.SensorDataRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/iot")
@RequiredArgsConstructor
@CrossOrigin("*")
public class SensorLogController {

    private final SensorLogService sensorLogService;

    @PostMapping("/sensor-data")
    public SensorLog saveSensorData(@RequestBody SensorDataRequest request) {
        return sensorLogService.save(request);
    }

    @GetMapping("/latest")
    public SensorLog getLatest() {
        return sensorLogService.getLatest();
    }

    @GetMapping("/history")
    public List<SensorLog> getHistory() {
        return sensorLogService.getHistory();
    }
}