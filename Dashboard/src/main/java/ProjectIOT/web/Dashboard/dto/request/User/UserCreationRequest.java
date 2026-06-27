package ProjectIOT.web.Dashboard.dto.request.User;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {

    @NotBlank(message = "FIRST_NAME")
    String fullName;

    @Size(min = 6, message = "USERNAME_UNVALID")
    String username;

    @Size(min = 8,message = "PASSWORD_UNVALID")
    String password;

}
