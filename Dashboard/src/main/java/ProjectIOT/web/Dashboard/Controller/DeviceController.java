package ProjectIOT.web.Dashboard.Controller;

import ProjectIOT.web.Dashboard.dto.request.device.DeviceControlRequest;
import ProjectIOT.web.Dashboard.dto.request.device.DeviceCreationRequest;
import ProjectIOT.web.Dashboard.dto.request.device.DeviceStatusUpdateRequest;
import ProjectIOT.web.Dashboard.dto.request.device.DeviceUpdateRequest;
import ProjectIOT.web.Dashboard.dto.response.Auth.ApiResponse;
import ProjectIOT.web.Dashboard.dto.response.device.DeviceControlResponse;
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

    @PostMapping("/code/{deviceCode}/control")
    public ResponseEntity<ApiResponse<DeviceControlResponse>> controlDeviceByCode(
            @PathVariable String deviceCode,
            @RequestBody @Valid DeviceControlRequest request
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.<DeviceControlResponse>builder()
                        .code(1000)
                        .message("Control device successfully")
                        .result(deviceService.controlDeviceByCode(deviceCode, request))
                        .build());
    }
}
