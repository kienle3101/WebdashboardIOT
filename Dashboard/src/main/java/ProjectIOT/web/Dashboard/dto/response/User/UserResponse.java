package ProjectIOT.web.Dashboard.dto.response.User;

import ProjectIOT.web.Dashboard.dto.response.Auth.PermissionResponse;
import ProjectIOT.web.Dashboard.dto.response.Auth.RoleResponse;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String id;
    String fullName;
    String username;
    Set<RoleResponse> roles;
    Set<PermissionResponse> permissions;
}
