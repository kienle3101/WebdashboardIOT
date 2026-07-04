package ProjectIOT.web.Dashboard.service.SerialPort;

import ProjectIOT.web.Dashboard.Configuration.SerialProperties;
import ProjectIOT.web.Dashboard.exception.AppException;
import ProjectIOT.web.Dashboard.exception.ErrorCode;
import com.fazecast.jSerialComm.SerialPort;
import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class SerialPortService {

    private final SerialProperties serialProperties;

    private SerialPort serialPort;

    public synchronized boolean isConnected() {
        return serialPort != null && serialPort.isOpen();
    }

    public synchronized void openPort() {
        if (isConnected()) {
            return;
        }

        serialPort = SerialPort.getCommPort(serialProperties.getPort());

        serialPort.setComPortParameters(
                serialProperties.getBaudRate(),
                8,
                SerialPort.ONE_STOP_BIT,
                SerialPort.NO_PARITY
        );

        serialPort.setComPortTimeouts(
                SerialPort.TIMEOUT_WRITE_BLOCKING,
                1000,
                1000
        );

        boolean opened = serialPort.openPort();

        if (!opened) {
            throw new AppException(ErrorCode.SERIAL_PORT_OPEN_FAILED);
        }
    }

    public synchronized void connectIfNeeded() {
        if (!isConnected()) {
            openPort();
        }
    }

    public synchronized void sendCommand(String command) {
        connectIfNeeded();

        String data = command + "\n";
        byte[] bytes = data.getBytes(StandardCharsets.UTF_8);

        int bytesWritten = serialPort.writeBytes(bytes, bytes.length);

        if (bytesWritten != bytes.length) {
            throw new AppException(ErrorCode.SERIAL_PORT_SEND_FAILED);
        }
    }

    public synchronized void closePort() {
        if (serialPort != null && serialPort.isOpen()) {
            serialPort.closePort();
        }
    }

    public String getPortName() {
        return serialProperties.getPort();
    }

    public int getBaudRate() {
        return serialProperties.getBaudRate();
    }

    @PreDestroy
    public void destroy() {
        closePort();
    }
}