package ProjectIOT.web.Dashboard.Configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "serial")
public class SerialProperties {
    private String port;
    private int baudRate;
}
