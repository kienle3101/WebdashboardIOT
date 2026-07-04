package ProjectIOT.web.Dashboard.dto.request.device;

import ProjectIOT.web.Dashboard.enums.DeviceStatus;
import ProjectIOT.web.Dashboard.enums.DeviceUsageSource;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeviceControlRequest {

    @NotNull(message = "CURRENT_STATUS_REQUIRED")
    private DeviceStatus targetStatus;

    @NotNull(message = "SOURCE_REQUIRED")
    private DeviceUsageSource source;
}
