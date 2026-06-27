package ProjectIOT.web.Dashboard.service.Auth;

import ProjectIOT.web.Dashboard.dto.request.Auth.RoleRequest;
import ProjectIOT.web.Dashboard.dto.response.Auth.RoleResponse;

import java.util.List;

public interface RoleService {

    RoleResponse create(RoleRequest request);

    List<RoleResponse> getAllRoles();

}
