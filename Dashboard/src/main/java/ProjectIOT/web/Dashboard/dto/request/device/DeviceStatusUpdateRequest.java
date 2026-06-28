package ProjectIOT.web.Dashboard.dto.request.device;

import ProjectIOT.web.Dashboard.enums.DeviceStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeviceStatusUpdateRequest {

    @NotNull(message = "CURRENT_STATUS_REQUIRED")
    private DeviceStatus currentStatus;
}