package ProjectIOT.web.Dashboard.service.device;

import ProjectIOT.web.Dashboard.dto.request.device.DeviceControlRequest;
import ProjectIOT.web.Dashboard.dto.request.device.DeviceCreationRequest;
import ProjectIOT.web.Dashboard.dto.response.device.DeviceControlResponse;
import ProjectIOT.web.Dashboard.dto.response.device.DeviceResponse;

import java.util.List;

public interface DeviceService {

    DeviceResponse createDevice(DeviceCreationRequest request);

    List<DeviceResponse> getAllDevices();

    void deleteDevice(String id);

    DeviceControlResponse controlDeviceByCode(String deviceCode, DeviceControlRequest request);
}
