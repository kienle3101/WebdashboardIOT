package ProjectIOT.web.Dashboard.dto.response.device;

import ProjectIOT.web.Dashboard.enums.DeviceStatus;
import ProjectIOT.web.Dashboard.enums.DeviceUsageSource;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeviceControlResponse {

    private String deviceCode;
    private String deviceName;
    private DeviceStatus currentStatus;

    private String command;
    private DeviceUsageSource source;

    private boolean success;
    private String message;
}
