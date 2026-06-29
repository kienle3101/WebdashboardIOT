package ProjectIOT.web.Dashboard.service.device.impl;

import ProjectIOT.web.Dashboard.entity.Device;
import ProjectIOT.web.Dashboard.enums.DeviceStatus;
import ProjectIOT.web.Dashboard.enums.DeviceType;
import ProjectIOT.web.Dashboard.exception.AppException;
import ProjectIOT.web.Dashboard.exception.ErrorCode;
import ProjectIOT.web.Dashboard.mapper.DeviceMapper;
import ProjectIOT.web.Dashboard.repository.DeviceRepository;
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
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @Transactional(readOnly = true)
    public List<DeviceResponse> getDeviceStatuses() {
        return getAllDevices();
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional(readOnly = true)
    public DeviceResponse getDeviceById(String id) {
        Device device = findDeviceById(id);
        return deviceMapper.toDeviceResponse(device);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('DEVICE_' + #deviceCode)")
    @Transactional(readOnly = true)
    public DeviceResponse getDeviceByCode(String deviceCode) {
        Device device = deviceRepository.findByDeviceCode(normalize(deviceCode))
                .orElseThrow(() -> new AppException(ErrorCode.DEVICE_NOT_FOUND));

        return toDeviceResponseWithPermission(deviceRepository.save(device));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public DeviceResponse updateDevice(String id, DeviceUpdateRequest request) {
        Device device = findDeviceById(id);

        DeviceType newDeviceType = request.getDeviceType() != null
                ? request.getDeviceType()
                : device.getDeviceType();

        DeviceStatus newStatus = request.getCurrentStatus() != null
                ? request.getCurrentStatus()
                : device.getCurrentStatus();

        validateDeviceCodeAndType(device.getDeviceCode(), newDeviceType);
        validateStatusByType(newDeviceType, newStatus);

        deviceMapper.updateDevice(device, request);

        return deviceMapper.toDeviceResponse(deviceRepository.save(device));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('DEVICE_' + #deviceCode)")
    public DeviceResponse updateDeviceStatusByCode(String deviceCode, DeviceStatusUpdateRequest request) {
        Device device = deviceRepository.findByDeviceCode(normalize(deviceCode))
                .orElseThrow(() -> new AppException(ErrorCode.DEVICE_NOT_FOUND));

        validateStatusByType(device.getDeviceType(), request.getCurrentStatus());

        device.setCurrentStatus(request.getCurrentStatus());

        return toDeviceResponseWithPermission(deviceRepository.save(device));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteDevice(String id) {
        Device device = findDeviceById(id);
        deviceRepository.delete(device);
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
}