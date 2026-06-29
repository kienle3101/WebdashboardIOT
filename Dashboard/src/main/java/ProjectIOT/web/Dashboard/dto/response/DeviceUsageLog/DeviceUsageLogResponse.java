package ProjectIOT.web.Dashboard.dto.response.DeviceUsageLog;

import ProjectIOT.web.Dashboard.enums.DeviceUsageAction;
import ProjectIOT.web.Dashboard.enums.DeviceUsageResult;
import ProjectIOT.web.Dashboard.enums.DeviceUsageSource;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DeviceUsageLogResponse {

    String id;

    String userId;

    String username;

    String fullName;

    String deviceId;

    String deviceCode;

    String deviceName;

    DeviceUsageAction action;

    DeviceUsageSource source;

    DeviceUsageResult result;

    String description;

    LocalDateTime createdAt;
}