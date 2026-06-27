package ProjectIOT.web.Dashboard.mapper;

import ProjectIOT.web.Dashboard.dto.request.Auth.RoleRequest;
import ProjectIOT.web.Dashboard.dto.response.Auth.RoleResponse;
import ProjectIOT.web.Dashboard.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Mapping(target = "permissions", ignore = true)
    Role toRole(RoleRequest request);

    RoleResponse toRoleResponse(Role role);

}
