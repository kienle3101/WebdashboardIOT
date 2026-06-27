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
