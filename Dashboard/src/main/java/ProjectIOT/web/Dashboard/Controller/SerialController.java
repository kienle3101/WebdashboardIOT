package ProjectIOT.web.Dashboard.Controller;

import ProjectIOT.web.Dashboard.dto.response.Auth.ApiResponse;
import ProjectIOT.web.Dashboard.dto.response.device.SerialStatusResponse;
import ProjectIOT.web.Dashboard.service.SerialPort.SerialPortService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/serial")
@RequiredArgsConstructor
public class SerialController {

    private final SerialPortService serialPortService;

    @PostMapping("/connect")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<SerialStatusResponse>> connectSerial() {
        try {
            boolean alreadyConnected = serialPortService.isConnected();

            serialPortService.connectIfNeeded();

            SerialStatusResponse response = SerialStatusResponse.builder()
                    .port(serialPortService.getPortName())
                    .baudRate(serialPortService.getBaudRate())
                    .connected(true)
                    .message(alreadyConnected
                            ? "COM port already connected"
                            : "COM port connected successfully")
                    .build();

            return ResponseEntity.ok(
                    ApiResponse.<SerialStatusResponse>builder()
                            .code(1000)
                            .message("Check serial connection successfully")
                            .result(response)
                            .build()
            );

        } catch (Exception e) {
            SerialStatusResponse response = SerialStatusResponse.builder()
                    .port(serialPortService.getPortName())
                    .baudRate(serialPortService.getBaudRate())
                    .connected(false)
                    .message("Cannot connect COM port: " + e.getMessage())
                    .build();

            return ResponseEntity.ok(
                    ApiResponse.<SerialStatusResponse>builder()
                            .code(1000)
                            .message("Check serial connection successfully")
                            .result(response)
                            .build()
            );
        }
    }

    @GetMapping("/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<SerialStatusResponse>> getSerialStatus() {
        SerialStatusResponse response = SerialStatusResponse.builder()
                .port(serialPortService.getPortName())
                .baudRate(serialPortService.getBaudRate())
                .connected(serialPortService.isConnected())
                .message(serialPortService.isConnected()
                        ? "COM port is connected"
                        : "COM port is not connected")
                .build();

        return ResponseEntity.ok(
                ApiResponse.<SerialStatusResponse>builder()
                        .code(1000)
                        .message("Get serial status successfully")
                        .result(response)
                        .build()
        );
    }

    @PostMapping("/disconnect")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<SerialStatusResponse>> disconnectSerial() {
        serialPortService.closePort();

        SerialStatusResponse response = SerialStatusResponse.builder()
                .port(serialPortService.getPortName())
                .baudRate(serialPortService.getBaudRate())
                .connected(false)
                .message("COM port disconnected successfully")
                .build();

        return ResponseEntity.ok(
                ApiResponse.<SerialStatusResponse>builder()
                        .code(1000)
                        .message("Disconnect serial successfully")
                        .result(response)
                        .build()
        );
    }
}