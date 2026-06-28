package ProjectIOT.web.Dashboard.service.device;

import ProjectIOT.web.Dashboard.dto.request.device.DeviceCreationRequest;
import ProjectIOT.web.Dashboard.dto.request.device.DeviceStatusUpdateRequest;
import ProjectIOT.web.Dashboard.dto.request.device.DeviceUpdateRequest;
import ProjectIOT.web.Dashboard.dto.response.device.DeviceResponse;

import java.util.List;

public interface DeviceService {

    DeviceResponse createDevice(DeviceCreationRequest request);

    List<DeviceResponse> getAllDevices();

    List<DeviceResponse> getDeviceStatuses();

    DeviceResponse getDeviceById(String id);

    DeviceResponse getDeviceByCode(String deviceCode);

    DeviceResponse updateDevice(String id, DeviceUpdateRequest request);

    DeviceResponse updateDeviceStatusByCode(String deviceCode, DeviceStatusUpdateRequest request);

    void deleteDevice(String id);
}
