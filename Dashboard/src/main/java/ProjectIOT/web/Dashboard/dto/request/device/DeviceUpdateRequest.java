package ProjectIOT.web.Dashboard.dto.request.device;

import ProjectIOT.web.Dashboard.enums.DeviceStatus;
import ProjectIOT.web.Dashboard.enums.DeviceType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeviceUpdateRequest {

    private String deviceName;

    private DeviceType deviceType;

    private DeviceStatus currentStatus;
}
