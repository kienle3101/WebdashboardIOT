package ProjectIOT.web.Dashboard.Configuration;

import ProjectIOT.web.Dashboard.entity.Permission;
import ProjectIOT.web.Dashboard.enums.PermissionName;
import ProjectIOT.web.Dashboard.repository.PermissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class PermissionInitConfig {

    @Bean
    ApplicationRunner initPermissions(PermissionRepository permissionRepository) {
        return args -> {
            for (PermissionName permissionName : PermissionName.values()) {
                if (!permissionRepository.existsById(permissionName.name())) {
                    Permission permission = Permission.builder()
                            .name(permissionName.name())
                            .description(getDescription(permissionName))
                            .build();

                    permissionRepository.save(permission);
                }
            }
        };
    }

    private String getDescription(PermissionName permissionName) {
        return switch (permissionName) {
            case DEVICE_LIGHT -> "Được xem và điều khiển đèn";
            case DEVICE_FAN -> "Được xem và điều khiển quạt";
            case DEVICE_DOOR -> "Được xem và điều khiển cửa";
        };
    }
}
