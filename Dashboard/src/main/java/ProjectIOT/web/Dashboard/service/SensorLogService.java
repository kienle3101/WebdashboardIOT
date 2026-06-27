package ProjectIOT.web.Dashboard.service;

import ProjectIOT.web.Dashboard.entity.SensorLog;
import ProjectIOT.web.Dashboard.repository.SensorLogRepository;
import ProjectIOT.web.Dashboard.dto.request.SensorDataRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SensorLogService {

    private final SensorLogRepository sensorLogRepository;

    public SensorLogService(SensorLogRepository sensorLogRepository) {
        this.sensorLogRepository = sensorLogRepository;
    }

    public SensorLog save(SensorDataRequest request) {
        SensorLog log = new SensorLog();

        log.setTemperature(request.getTemperature());
        log.setLightValue(request.getLightValue());
        log.setMotionDetected(request.getMotionDetected());
        log.setLedStatus(request.getLedStatus());
        log.setFanStatus(request.getFanStatus());
        log.setDoorStatus(request.getDoorStatus());
        log.setBuzzerStatus(request.getBuzzerStatus());
        log.setMode(request.getMode());
        log.setCreatedAt(LocalDateTime.now());

        return sensorLogRepository.save(log);
    }

    public SensorLog getLatest() {
        return sensorLogRepository.findTopByOrderByCreatedAtDesc()
                .orElse(null);
    }

    public List<SensorLog> getHistory() {
        return sensorLogRepository.findAll();
    }
}