package ProjectIOT.web.Dashboard.service.DeviveUsageLog;

import ProjectIOT.web.Dashboard.dto.request.DeviceUsageLog.DeviceUsageLogCreationRequest;
import ProjectIOT.web.Dashboard.dto.response.DeviceUsageLog.DeviceUsageLogResponse;
import ProjectIOT.web.Dashboard.dto.response.PageResponse;


public interface DeviceUsageLogService {

    DeviceUsageLogResponse createLog(DeviceUsageLogCreationRequest request);

    PageResponse<DeviceUsageLogResponse> getAllLogs(int pageNo, int pageSize);

    PageResponse<DeviceUsageLogResponse> getMyLogs(int pageNo, int pageSize);

    PageResponse<DeviceUsageLogResponse> getLogsByUser(String userId, int pageNo, int pageSize);

    PageResponse<DeviceUsageLogResponse> getLogsByDeviceCode(String deviceCode, int pageNo, int pageSize);
}
