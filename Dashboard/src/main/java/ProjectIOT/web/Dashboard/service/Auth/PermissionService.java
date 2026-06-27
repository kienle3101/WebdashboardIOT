package ProjectIOT.web.Dashboard.service.Auth;

import ProjectIOT.web.Dashboard.dto.request.Auth.PermissionRequest;
import ProjectIOT.web.Dashboard.dto.response.Auth.PermissionResponse;

import java.util.List;

public interface PermissionService {

    PermissionResponse createPermission(PermissionRequest request);

    List<PermissionResponse> getAllPermissions();

    void delete(String permission);
}
