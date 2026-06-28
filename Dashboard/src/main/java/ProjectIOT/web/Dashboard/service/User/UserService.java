package ProjectIOT.web.Dashboard.service.User;

import ProjectIOT.web.Dashboard.dto.request.User.UserCreationRequest;
import ProjectIOT.web.Dashboard.dto.request.User.UserPermissionUpdateRequest;
import ProjectIOT.web.Dashboard.dto.response.PageResponse;
import ProjectIOT.web.Dashboard.dto.response.User.UserResponse;

public interface UserService {
    UserResponse createUser(UserCreationRequest request);

    UserResponse getUserById(String userId);

    PageResponse<UserResponse> getAllUsers(int pageNo, int pageSize);

    void deleteUser(String userId);

    public UserResponse getMyInfo();

    UserResponse updateUserPermissions(String userId, UserPermissionUpdateRequest request);
}
