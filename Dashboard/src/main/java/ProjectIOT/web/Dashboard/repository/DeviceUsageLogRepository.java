package ProjectIOT.web.Dashboard.repository;

import ProjectIOT.web.Dashboard.entity.DeviceUsageLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DeviceUsageLogRepository extends JpaRepository<DeviceUsageLog, String> {

    Page<DeviceUsageLog> findByUserId(String userId, Pageable pageable);

    Page<DeviceUsageLog> findByDeviceDeviceCode(String deviceCode, Pageable pageable);
}
