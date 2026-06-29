package ProjectIOT.web.Dashboard.service.DeviveUsageLog.impl;

import ProjectIOT.web.Dashboard.dto.request.DeviceUsageLog.DeviceUsageLogCreationRequest;
import ProjectIOT.web.Dashboard.dto.response.DeviceUsageLog.DeviceUsageLogResponse;
import ProjectIOT.web.Dashboard.dto.response.PageResponse;
import ProjectIOT.web.Dashboard.entity.Device;
import ProjectIOT.web.Dashboard.entity.DeviceUsageLog;
import ProjectIOT.web.Dashboard.entity.User;
import ProjectIOT.web.Dashboard.enums.DeviceUsageAction;
import ProjectIOT.web.Dashboard.exception.AppException;
import ProjectIOT.web.Dashboard.exception.ErrorCode;
import ProjectIOT.web.Dashboard.mapper.DeviceUsageLogMapper;
import ProjectIOT.web.Dashboard.repository.DeviceRepository;
import ProjectIOT.web.Dashboard.repository.DeviceUsageLogRepository;
import ProjectIOT.web.Dashboard.repository.UserRepository;
import ProjectIOT.web.Dashboard.service.DeviveUsageLog.DeviceUsageLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class DeviceUsageLogServiceImpl implements DeviceUsageLogService {

    private final DeviceUsageLogRepository deviceUsageLogRepository;
    private final DeviceUsageLogMapper deviceUsageLogMapper;
    private final DeviceRepository deviceRepository;
    private final UserRepository userRepository;

    @Override
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('DEVICE_' + #request.deviceCode)")
    public DeviceUsageLogResponse createLog(DeviceUsageLogCreationRequest request) {
        User currentUser = getCurrentUser();

        Device device = deviceRepository.findByDeviceCode(normalize(request.getDeviceCode()))
                .orElseThrow(() -> new AppException(ErrorCode.DEVICE_NOT_FOUND));

        validateActionByDeviceCode(device.getDeviceCode(), request.getAction());

        DeviceUsageLog log = DeviceUsageLog.builder()
                .user(currentUser)
                .device(device)
                .action(request.getAction())
                .source(request.getSource())
                .result(request.getResult())
                .description(request.getDescription())
                .build();

        return deviceUsageLogMapper.toDeviceUsageLogResponse(
                deviceUsageLogRepository.save(log)
        );
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional(readOnly = true)
    public PageResponse<DeviceUsageLogResponse> getAllLogs(int pageNo, int pageSize) {
        Pageable pageable = createPageable(pageNo, pageSize);

        Page<DeviceUsageLog> pageData = deviceUsageLogRepository.findAll(pageable);

        return toPageResponse(pageData);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @Transactional(readOnly = true)
    public PageResponse<DeviceUsageLogResponse> getMyLogs(int pageNo, int pageSize) {
        User currentUser = getCurrentUser();

        Pageable pageable = createPageable(pageNo, pageSize);

        Page<DeviceUsageLog> pageData = deviceUsageLogRepository.findByUserId(
                currentUser.getId(),
                pageable
        );

        return toPageResponse(pageData);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional(readOnly = true)
    public PageResponse<DeviceUsageLogResponse> getLogsByUser(String userId, int pageNo, int pageSize) {
        userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        Pageable pageable = createPageable(pageNo, pageSize);

        Page<DeviceUsageLog> pageData = deviceUsageLogRepository.findByUserId(
                userId,
                pageable
        );

        return toPageResponse(pageData);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional(readOnly = true)
    public PageResponse<DeviceUsageLogResponse> getLogsByDeviceCode(String deviceCode, int pageNo, int pageSize) {
        Device device = deviceRepository.findByDeviceCode(normalize(deviceCode))
                .orElseThrow(() -> new AppException(ErrorCode.DEVICE_NOT_FOUND));

        Pageable pageable = createPageable(pageNo, pageSize);

        Page<DeviceUsageLog> pageData = deviceUsageLogRepository.findByDeviceDeviceCode(
                device.getDeviceCode(),
                pageable
        );

        return toPageResponse(pageData);
    }

    private Pageable createPageable(int pageNo, int pageSize) {
        int validPageNo = Math.max(pageNo, 1);
        int validPageSize = Math.max(pageSize, 1);

        return PageRequest.of(
                validPageNo - 1,
                validPageSize,
                Sort.by(Sort.Direction.DESC, "createdAt")
        );
    }

    private PageResponse<DeviceUsageLogResponse> toPageResponse(Page<DeviceUsageLog> pageData) {
        return PageResponse.<DeviceUsageLogResponse>builder()
                .content(
                        pageData.getContent()
                                .stream()
                                .map(deviceUsageLogMapper::toDeviceUsageLogResponse)
                                .toList()
                )
                .pageNo(pageData.getNumber() + 1)
                .pageSize(pageData.getSize())
                .totalElements(pageData.getTotalElements())
                .totalPages(pageData.getTotalPages())
                .last(pageData.isLast())
                .build();
    }

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }

    private void validateActionByDeviceCode(String deviceCode, DeviceUsageAction action) {
        String code = normalize(deviceCode);

        if ("LIGHT".equals(code)) {
            if (action != DeviceUsageAction.LIGHT_ON && action != DeviceUsageAction.LIGHT_OFF) {
                throw new AppException(ErrorCode.DEVICE_USAGE_ACTION_INVALID);
            }
            return;
        }

        if ("FAN".equals(code)) {
            if (action != DeviceUsageAction.FAN_ON && action != DeviceUsageAction.FAN_OFF) {
                throw new AppException(ErrorCode.DEVICE_USAGE_ACTION_INVALID);
            }
            return;
        }

        if ("DOOR".equals(code)) {
            if (action != DeviceUsageAction.DOOR_OPEN && action != DeviceUsageAction.DOOR_CLOSE) {
                throw new AppException(ErrorCode.DEVICE_USAGE_ACTION_INVALID);
            }
            return;
        }

        throw new AppException(ErrorCode.DEVICE_NOT_FOUND);
    }

    private String normalize(String value) {
        return value == null ? null : value.trim().toUpperCase();
    }
}