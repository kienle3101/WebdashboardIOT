package ProjectIOT.web.Dashboard.service.device.impl;

import ProjectIOT.web.Dashboard.dto.request.device.DeviceControlRequest;
import ProjectIOT.web.Dashboard.dto.response.device.DeviceControlResponse;
import ProjectIOT.web.Dashboard.entity.Device;
import ProjectIOT.web.Dashboard.entity.DeviceUsageLog;
import ProjectIOT.web.Dashboard.entity.User;
import ProjectIOT.web.Dashboard.enums.DeviceStatus;
import ProjectIOT.web.Dashboard.enums.DeviceType;
import ProjectIOT.web.Dashboard.enums.DeviceUsageAction;
import ProjectIOT.web.Dashboard.enums.DeviceUsageResult;
import ProjectIOT.web.Dashboard.exception.AppException;
import ProjectIOT.web.Dashboard.exception.ErrorCode;
import ProjectIOT.web.Dashboard.mapper.DeviceMapper;
import ProjectIOT.web.Dashboard.repository.DeviceRepository;
import ProjectIOT.web.Dashboard.repository.DeviceUsageLogRepository;
import ProjectIOT.web.Dashboard.repository.UserRepository;
import ProjectIOT.web.Dashboard.service.SerialPort.SerialPortService;
import ProjectIOT.web.Dashboard.service.device.DeviceService;
import ProjectIOT.web.Dashboard.dto.request.device.DeviceCreationRequest;
import ProjectIOT.web.Dashboard.dto.request.device.DeviceStatusUpdateRequest;
import ProjectIOT.web.Dashboard.dto.request.device.DeviceUpdateRequest;
import ProjectIOT.web.Dashboard.dto.response.device.DeviceResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class DeviceServiceImpl implements DeviceService {

    DeviceRepository deviceRepository;
    DeviceMapper deviceMapper;

    DeviceUsageLogRepository deviceUsageLogRepository;
    UserRepository userRepository;
    SerialPortService serialPortService;

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public DeviceResponse createDevice(DeviceCreationRequest request) {
        String deviceCode = normalize(request.getDeviceCode());

        if (deviceRepository.existsByDeviceCode(deviceCode)) {
            throw new AppException(ErrorCode.DEVICE_ALREADY_EXISTS);
        }

        validateDeviceCodeAndType(deviceCode, request.getDeviceType());
        validateStatusByType(request.getDeviceType(), request.getCurrentStatus());

        Device device = deviceMapper.toDevice(request);
        device.setDeviceCode(deviceCode);

        return deviceMapper.toDeviceResponse(deviceRepository.save(device));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @Transactional(readOnly = true)
    public List<DeviceResponse> getAllDevices() {
        return deviceRepository.findAll()
                .stream()
                .map(this::toDeviceResponseWithPermission)
                .toList();
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteDevice(String id) {
        Device device = findDeviceById(id);
        deviceRepository.delete(device);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('DEVICE_' + #deviceCode.toUpperCase())")
    public DeviceControlResponse controlDeviceByCode(String deviceCode, DeviceControlRequest request) {
        User currentUser = getCurrentUser();

        Device device = deviceRepository.findByDeviceCode(normalize(deviceCode))
                .orElseThrow(() -> new AppException(ErrorCode.DEVICE_NOT_FOUND));

        validateStatusByType(device.getDeviceType(), request.getTargetStatus());

        DeviceUsageAction action = mapToAction(device.getDeviceType(), request.getTargetStatus());
        String command = action.name();

        try {
            serialPortService.sendCommand(command);

            device.setCurrentStatus(request.getTargetStatus());
            deviceRepository.save(device);

            saveUsageLog(
                    currentUser,
                    device,
                    action,
                    request,
                    DeviceUsageResult.SUCCESS,
                    "Control device successfully: " + command
            );

            return DeviceControlResponse.builder()
                    .deviceCode(device.getDeviceCode())
                    .deviceName(device.getDeviceName())
                    .currentStatus(device.getCurrentStatus())
                    .command(command)
                    .source(request.getSource())
                    .success(true)
                    .message("Sent command to COM successfully")
                    .build();

        } catch (Exception e) {
            saveUsageLog(
                    currentUser,
                    device,
                    action,
                    request,
                    DeviceUsageResult.FAILED,
                    "Control device failed: " + e.getMessage()
            );

            return DeviceControlResponse.builder()
                    .deviceCode(device.getDeviceCode())
                    .deviceName(device.getDeviceName())
                    .currentStatus(device.getCurrentStatus())
                    .command(command)
                    .source(request.getSource())
                    .success(false)
                    .message("Cannot send command to COM: " + e.getMessage())
                    .build();
        }
    }

    private Device findDeviceById(String id) {
        return deviceRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.DEVICE_NOT_FOUND));
    }

    private void validateDeviceCodeAndType(String deviceCode, DeviceType deviceType) {
        if (deviceCode == null || deviceType == null) {
            throw new AppException(ErrorCode.DEVICE_INVALID);
        }

        if (!deviceCode.equals(deviceType.name())) {
            throw new AppException(ErrorCode.DEVICE_CODE_TYPE_NOT_MATCH);
        }
    }

    private void validateStatusByType(DeviceType deviceType, DeviceStatus status) {
        if (deviceType == null || status == null) {
            throw new AppException(ErrorCode.DEVICE_INVALID);
        }

        if (deviceType == DeviceType.LIGHT || deviceType == DeviceType.FAN) {
            if (status != DeviceStatus.ON && status != DeviceStatus.OFF) {
                throw new AppException(ErrorCode.DEVICE_STATUS_INVALID);
            }
            return;
        }

        if (deviceType == DeviceType.DOOR) {
            if (status != DeviceStatus.OPEN && status != DeviceStatus.CLOSED) {
                throw new AppException(ErrorCode.DEVICE_STATUS_INVALID);
            }
            return;
        }

        throw new AppException(ErrorCode.DEVICE_TYPE_INVALID);
    }

    private String normalize(String value) {
        return value == null ? null : value.trim().toUpperCase();
    }

    private DeviceUsageAction mapToAction(DeviceType deviceType, DeviceStatus targetStatus) {
        if (deviceType == DeviceType.LIGHT) {
            if (targetStatus == DeviceStatus.ON) {
                return DeviceUsageAction.LIGHT_ON;
            }

            if (targetStatus == DeviceStatus.OFF) {
                return DeviceUsageAction.LIGHT_OFF;
            }
        }

        if (deviceType == DeviceType.FAN) {
            if (targetStatus == DeviceStatus.ON) {
                return DeviceUsageAction.FAN_ON;
            }

            if (targetStatus == DeviceStatus.OFF) {
                return DeviceUsageAction.FAN_OFF;
            }
        }

        if (deviceType == DeviceType.DOOR) {
            if (targetStatus == DeviceStatus.OPEN) {
                return DeviceUsageAction.DOOR_OPEN;
            }

            if (targetStatus == DeviceStatus.CLOSED) {
                return DeviceUsageAction.DOOR_CLOSE;
            }
        }

        throw new AppException(ErrorCode.DEVICE_USAGE_ACTION_INVALID);
    }

    private void saveUsageLog(
            User user,
            Device device,
            DeviceUsageAction action,
            DeviceControlRequest request,
            DeviceUsageResult result,
            String description
    ) {
        DeviceUsageLog log = DeviceUsageLog.builder()
                .user(user)
                .device(device)
                .action(action)
                .source(request.getSource())
                .result(result)
                .description(description)
                .build();

        deviceUsageLogRepository.save(log);
    }

    private DeviceResponse toDeviceResponseWithPermission(Device device) {
        DeviceResponse response = deviceMapper.toDeviceResponse(device);
        response.setHasPermission(hasDevicePermission(device.getDeviceCode()));
        return response;
    }

    private boolean hasDevicePermission(String deviceCode) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getAuthorities() == null) {
            return false;
        }

        String permissionName = "DEVICE_" + normalize(deviceCode);

        return authentication.getAuthorities()
                .stream()
                .anyMatch(authority ->
                        authority.getAuthority().equals("ROLE_ADMIN")
                                || authority.getAuthority().equals(permissionName)
                );
    }

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }
}