package ProjectIOT.web.Dashboard.dto.request.device;

import ProjectIOT.web.Dashboard.enums.DeviceStatus;
import ProjectIOT.web.Dashboard.enums.DeviceType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeviceCreationRequest {

    @NotBlank(message = "DEVICE_CODE_REQUIRED")
    private String deviceCode;

    @NotBlank(message = "DEVICE_NAME_REQUIRED")
    private String deviceName;

    @NotNull(message = "DEVICE_TYPE_REQUIRED")
    private DeviceType deviceType;

    @NotNull(message = "CURRENT_STATUS_REQUIRED")
    private DeviceStatus currentStatus;
}