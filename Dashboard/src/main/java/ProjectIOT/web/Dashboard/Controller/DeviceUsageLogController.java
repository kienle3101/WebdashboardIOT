package ProjectIOT.web.Dashboard.Controller;

import ProjectIOT.web.Dashboard.dto.request.DeviceUsageLog.DeviceUsageLogCreationRequest;
import ProjectIOT.web.Dashboard.dto.response.Auth.ApiResponse;
import ProjectIOT.web.Dashboard.dto.response.DeviceUsageLog.DeviceUsageLogResponse;
import ProjectIOT.web.Dashboard.dto.response.PageResponse;
import ProjectIOT.web.Dashboard.service.DeviveUsageLog.DeviceUsageLogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/logs")
@RequiredArgsConstructor
public class DeviceUsageLogController {

    private final DeviceUsageLogService deviceUsageLogService;

    @PostMapping
    public ResponseEntity<ApiResponse<DeviceUsageLogResponse>> createLog(
            @RequestBody @Valid DeviceUsageLogCreationRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<DeviceUsageLogResponse>builder()
                        .code(1000)
                        .message("Create device usage log successfully")
                        .result(deviceUsageLogService.createLog(request))
                        .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<DeviceUsageLogResponse>>> getAllLogs(
            @RequestParam(defaultValue = "1") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.<PageResponse<DeviceUsageLogResponse>>builder()
                        .code(1000)
                        .message("Get all device usage logs successfully")
                        .result(deviceUsageLogService.getAllLogs(pageNo, pageSize))
                        .build());
    }

    @GetMapping("/myLogs")
    public ResponseEntity<ApiResponse<PageResponse<DeviceUsageLogResponse>>> getMyLogs(
            @RequestParam(defaultValue = "1") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.<PageResponse<DeviceUsageLogResponse>>builder()
                        .code(1000)
                        .message("Get my device usage logs successfully")
                        .result(deviceUsageLogService.getMyLogs(pageNo, pageSize))
                        .build());
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<ApiResponse<PageResponse<DeviceUsageLogResponse>>> getLogsByUser(
            @PathVariable String userId,
            @RequestParam(defaultValue = "1") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.<PageResponse<DeviceUsageLogResponse>>builder()
                        .code(1000)
                        .message("Get device usage logs by user successfully")
                        .result(deviceUsageLogService.getLogsByUser(userId, pageNo, pageSize))
                        .build());
    }

    @GetMapping("/devices/{deviceCode}")
    public ResponseEntity<ApiResponse<PageResponse<DeviceUsageLogResponse>>> getLogsByDeviceCode(
            @PathVariable String deviceCode,
            @RequestParam(defaultValue = "1") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.<PageResponse<DeviceUsageLogResponse>>builder()
                        .code(1000)
                        .message("Get device usage logs by device successfully")
                        .result(deviceUsageLogService.getLogsByDeviceCode(deviceCode, pageNo, pageSize))
                        .build());
    }
}