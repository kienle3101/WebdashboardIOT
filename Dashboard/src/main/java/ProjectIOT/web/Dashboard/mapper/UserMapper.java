package ProjectIOT.web.Dashboard.mapper;

import ProjectIOT.web.Dashboard.dto.request.User.UserCreationRequest;
import ProjectIOT.web.Dashboard.dto.response.User.UserResponse;
import ProjectIOT.web.Dashboard.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest request);

    UserResponse toUserResponse(User user);

}
