package ProjectIOT.web.Dashboard.mapper;

import ProjectIOT.web.Dashboard.entity.Device;
import ProjectIOT.web.Dashboard.dto.request.device.DeviceCreationRequest;
import ProjectIOT.web.Dashboard.dto.request.device.DeviceUpdateRequest;
import ProjectIOT.web.Dashboard.dto.response.device.DeviceResponse;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface DeviceMapper {

    Device toDevice(DeviceCreationRequest request);

    DeviceResponse toDeviceResponse(Device device);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateDevice(@MappingTarget Device device, DeviceUpdateRequest request);
}
