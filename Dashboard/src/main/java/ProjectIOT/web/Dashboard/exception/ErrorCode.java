package ProjectIOT.web.Dashboard.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "uncategorized exception", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(9998, "invalid key", HttpStatus.BAD_REQUEST),
    ROLE_NOT_FOUND(9997, "role not found", HttpStatus.NOT_FOUND),
    ACCESS_DENIED(9996, "access denied", HttpStatus.FORBIDDEN),

    //User
    USER_EXISTS(1001, "username already exists", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(1002, "user not found", HttpStatus.NOT_FOUND),
    USER_NOT_EXISTS(1003, "user not exists", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(1004, "unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1005, "You do not have permission", HttpStatus.FORBIDDEN),
    PERMISSION_NOT_FOUND(1006, "permission not found", HttpStatus.BAD_REQUEST),

    //device
    DEVICE_NOT_FOUND(2001, "Device not found", HttpStatus.NOT_FOUND),
    DEVICE_ALREADY_EXISTS(2002, "Device already exists", HttpStatus.CONFLICT),
    DEVICE_INVALID(2003, "Device data is invalid", HttpStatus.BAD_REQUEST),
    DEVICE_TYPE_INVALID(2004, "Device type is invalid", HttpStatus.BAD_REQUEST),
    DEVICE_STATUS_INVALID(2005, "Device status is invalid", HttpStatus.BAD_REQUEST),
    DEVICE_CODE_TYPE_NOT_MATCH(2006, "Device code must match device type", HttpStatus.BAD_REQUEST),
    DEVICE_USAGE_ACTION_INVALID(2007, "Device usage action is invalid", HttpStatus.BAD_REQUEST),
    ;

    


    private int code;
    private String message;
    private HttpStatusCode httpStatusCode;

    ErrorCode(int code, String message, HttpStatusCode httpStatusCode) {
        this.code = code;
        this.message = message;
        this.httpStatusCode = httpStatusCode;
    }
}
