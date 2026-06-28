package ProjectIOT.web.Dashboard.dto.response.device;

import ProjectIOT.web.Dashboard.enums.DeviceStatus;
import ProjectIOT.web.Dashboard.enums.DeviceType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeviceResponse {

    private String id;

    private String deviceCode;

    private String deviceName;

    private DeviceType deviceType;

    private DeviceStatus currentStatus;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}