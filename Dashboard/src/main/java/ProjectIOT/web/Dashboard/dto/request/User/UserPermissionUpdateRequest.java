package ProjectIOT.web.Dashboard.dto.request.User;

import ProjectIOT.web.Dashboard.enums.PermissionName;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPermissionUpdateRequest {

    @NotEmpty(message = "PERMISSION_REQUIRED")
    private Set<PermissionName> permissions;
}
