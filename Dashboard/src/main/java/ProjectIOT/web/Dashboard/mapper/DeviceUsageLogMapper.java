package ProjectIOT.web.Dashboard.mapper;

import ProjectIOT.web.Dashboard.dto.response.DeviceUsageLog.DeviceUsageLogResponse;
import ProjectIOT.web.Dashboard.entity.DeviceUsageLog;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface DeviceUsageLogMapper {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.username", target = "username")
    @Mapping(source = "user.fullName", target = "fullName")
    @Mapping(source = "device.id", target = "deviceId")
    @Mapping(source = "device.deviceCode", target = "deviceCode")
    @Mapping(source = "device.deviceName", target = "deviceName")
    DeviceUsageLogResponse toDeviceUsageLogResponse(DeviceUsageLog log);
}
