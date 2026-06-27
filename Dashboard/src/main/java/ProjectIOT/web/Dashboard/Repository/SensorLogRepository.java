package ProjectIOT.web.Dashboard.Repository;

import ProjectIOT.web.Dashboard.Entity.SensorLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SensorLogRepository extends JpaRepository<SensorLog, Long> {
    Optional<SensorLog> findTopByOrderByCreatedAtDesc();
}