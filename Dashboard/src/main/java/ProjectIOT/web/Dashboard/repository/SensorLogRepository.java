package ProjectIOT.web.Dashboard.repository;

import ProjectIOT.web.Dashboard.entity.SensorLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SensorLogRepository extends JpaRepository<SensorLog, Long> {
    Optional<SensorLog> findTopByOrderByCreatedAtDesc();
}