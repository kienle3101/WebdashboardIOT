package ProjectIOT.web.Dashboard.Controller;

import ProjectIOT.web.Dashboard.dto.request.device.DeviceCreationRequest;
import ProjectIOT.web.Dashboard.dto.request.device.DeviceStatusUpdateRequest;
import ProjectIOT.web.Dashboard.dto.request.device.DeviceUpdateRequest;
import ProjectIOT.web.Dashboard.dto.response.Auth.ApiResponse;
import ProjectIOT.web.Dashboard.dto.response.device.DeviceResponse;
import ProjectIOT.web.Dashboard.service.device.DeviceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/devices")
@RequiredArgsConstructor
public class DeviceController {

    private final DeviceService deviceService;

    @PostMapping
    public ResponseEntity<ApiResponse<DeviceResponse>> createDevice(
            @RequestBody @Valid DeviceCreationRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<DeviceResponse>builder()
                        .code(1000)
                        .message("Create device successfully")
                        .result(deviceService.createDevice(request))
                        .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<DeviceResponse>>> getAllDevices() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.<List<DeviceResponse>>builder()
                        .code(1000)
                        .message("Get all devices successfully")
                        .result(deviceService.getAllDevices())
                        .build());
    }

    @GetMapping("/status")
    public ResponseEntity<ApiResponse<List<DeviceResponse>>> getDeviceStatuses() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.<List<DeviceResponse>>builder()
                        .code(1000)
                        .message("Get device statuses successfully")
                        .result(deviceService.getDeviceStatuses())
                        .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DeviceResponse>> getDeviceById(
            @PathVariable String id
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.<DeviceResponse>builder()
                        .code(1000)
                        .message("Get device successfully")
                        .result(deviceService.getDeviceById(id))
                        .build());
    }

    @GetMapping("/code/{deviceCode}")
    public ResponseEntity<ApiResponse<DeviceResponse>> getDeviceByCode(
            @PathVariable String deviceCode
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.<DeviceResponse>builder()
                        .code(1000)
                        .message("Get device by code successfully")
                        .result(deviceService.getDeviceByCode(deviceCode))
                        .build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<DeviceResponse>> updateDevice(
            @PathVariable String id,
            @RequestBody DeviceUpdateRequest request
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.<DeviceResponse>builder()
                        .code(1000)
                        .message("Update device successfully")
                        .result(deviceService.updateDevice(id, request))
                        .build());
    }

    @PatchMapping("/code/{deviceCode}/status")
    public ResponseEntity<ApiResponse<DeviceResponse>> updateDeviceStatusByCode(
            @PathVariable String deviceCode,
            @RequestBody @Valid DeviceStatusUpdateRequest request
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.<DeviceResponse>builder()
                        .code(1000)
                        .message("Update device status successfully")
                        .result(deviceService.updateDeviceStatusByCode(deviceCode, request))
                        .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDevice(
            @PathVariable String id
    ) {
        deviceService.deleteDevice(id);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.<Void>builder()
                        .code(1000)
                        .message("Delete device successfully")
                        .build());
    }
}
