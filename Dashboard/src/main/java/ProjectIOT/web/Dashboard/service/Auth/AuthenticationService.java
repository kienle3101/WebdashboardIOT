package ProjectIOT.web.Dashboard.service.Auth;

import ProjectIOT.web.Dashboard.dto.request.Auth.AuthenticationRequest;
import ProjectIOT.web.Dashboard.dto.request.Auth.IntrospectRequest;
import ProjectIOT.web.Dashboard.dto.request.Auth.LogOutRequest;
import ProjectIOT.web.Dashboard.dto.request.Auth.RefeshRequest;
import ProjectIOT.web.Dashboard.dto.response.Auth.AuthenticationResponse;
import ProjectIOT.web.Dashboard.dto.response.Auth.IntrospectResponse;
import com.nimbusds.jose.JOSEException;

import java.text.ParseException;

public interface AuthenticationService {
    AuthenticationResponse authenticate(AuthenticationRequest request);

    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException;

    void logOut(LogOutRequest request) throws ParseException, JOSEException;

    AuthenticationResponse refeshToken(RefeshRequest request) throws ParseException, JOSEException;
}
