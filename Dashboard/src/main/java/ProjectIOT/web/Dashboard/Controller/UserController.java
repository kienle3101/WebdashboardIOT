package ProjectIOT.web.Dashboard.Controller;

import ProjectIOT.web.Dashboard.dto.request.User.UserCreationRequest;
import ProjectIOT.web.Dashboard.dto.request.User.UserPermissionUpdateRequest;
import ProjectIOT.web.Dashboard.dto.response.Auth.ApiResponse;
import ProjectIOT.web.Dashboard.dto.response.PageResponse;
import ProjectIOT.web.Dashboard.dto.response.User.UserResponse;
import ProjectIOT.web.Dashboard.service.User.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/users")
public class UserController {
    UserService userService;

    @PostMapping
    public ResponseEntity<ApiResponse<UserResponse>> createUser(@RequestBody @Valid UserCreationRequest request){

        log.info("Create user with username={}", request.getUsername());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<UserResponse>builder()
                        .code(1000)
                        .result(userService.createUser(request))
                        .message("User created")
                        .build());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserResponse>> getUser(@PathVariable String userId){
        log.info("Get user with userId={}", userId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.<UserResponse>builder()
                        .code(1000)
                        .result(userService.getUserById(userId))
                        .message("User get")
                        .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<UserResponse>>> getAllUser(@RequestParam(defaultValue = "1") int pageNo,
                                                                              @RequestParam(defaultValue = "10") int pageSize){
        log.info("Get all users");

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.<PageResponse<UserResponse>>builder()
                        .code(1000)
                        .result(userService.getAllUsers(pageNo, pageSize))
                        .message("All users")
                        .build());
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable String userId){
        log.info("Delete user with userId={}", userId);
        userService.deleteUser(userId);

        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(ApiResponse.<String>builder()
                        .code(1000)
                        .result("User deleted")
                        .build());
    }

    @GetMapping("/myInfo")
    public ResponseEntity<ApiResponse<UserResponse>> getMyInfo(){
        log.info("Get My Info");
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.<UserResponse>builder()
                        .code(1000)
                        .result(userService.getMyInfo())
                        .message("User get")
                        .build());
    }

    @PatchMapping("/{userId}/permissions")
    public ResponseEntity<ApiResponse<UserResponse>> updateUserPermissions(
            @PathVariable String userId,
            @RequestBody @Valid UserPermissionUpdateRequest request
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.<UserResponse>builder()
                        .code(1000)
                        .message("Update user permissions successfully")
                        .result(userService.updateUserPermissions(userId, request))
                        .build());
    }
}
