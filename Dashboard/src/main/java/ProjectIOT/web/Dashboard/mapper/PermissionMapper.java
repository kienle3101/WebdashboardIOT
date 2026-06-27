package ProjectIOT.web.Dashboard.mapper;

import ProjectIOT.web.Dashboard.dto.request.Auth.PermissionRequest;
import ProjectIOT.web.Dashboard.dto.response.Auth.PermissionResponse;
import ProjectIOT.web.Dashboard.entity.Permission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest request);

    PermissionResponse toPermissionResponse(Permission permission);

}
