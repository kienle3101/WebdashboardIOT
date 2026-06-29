package ProjectIOT.web.Dashboard.dto.request.DeviceUsageLog;

import ProjectIOT.web.Dashboard.enums.DeviceUsageAction;
import ProjectIOT.web.Dashboard.enums.DeviceUsageResult;
import ProjectIOT.web.Dashboard.enums.DeviceUsageSource;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DeviceUsageLogCreationRequest {

    @NotBlank(message = "DEVICE_CODE_REQUIRED")
    String deviceCode;

    @NotNull(message = "ACTION_REQUIRED")
    DeviceUsageAction action;

    @NotNull(message = "SOURCE_REQUIRED")
    DeviceUsageSource source;

    @NotNull(message = "RESULT_REQUIRED")
    DeviceUsageResult result;

    String description;
}