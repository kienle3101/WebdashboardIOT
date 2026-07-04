package ProjectIOT.web.Dashboard.dto.response.device;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SerialStatusResponse {

    private String port;
    private int baudRate;

    private boolean connected;
    private String message;
}