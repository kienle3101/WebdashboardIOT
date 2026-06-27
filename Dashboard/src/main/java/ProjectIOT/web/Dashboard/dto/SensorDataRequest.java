package ProjectIOT.web.Dashboard.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SensorDataRequest {
    private Float temperature;
    private Integer lightValue;
    private Boolean motionDetected;
    private Boolean ledStatus;
    private Boolean fanStatus;
    private String doorStatus;
    private Boolean buzzerStatus;
    private String mode;
}