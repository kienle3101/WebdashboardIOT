package ProjectIOT.web.Dashboard.entity;

import ProjectIOT.web.Dashboard.enums.DeviceUsageAction;
import ProjectIOT.web.Dashboard.enums.DeviceUsageResult;
import ProjectIOT.web.Dashboard.enums.DeviceUsageSource;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Table(name = "device_usage_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DeviceUsageLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "device_id", nullable = false)
    Device device;

    @Enumerated(EnumType.STRING)
    @Column(name = "action", nullable = false, length = 50)
    DeviceUsageAction action;

    @Enumerated(EnumType.STRING)
    @Column(name = "source", nullable = false, length = 50)
    DeviceUsageSource source;

    @Enumerated(EnumType.STRING)
    @Column(name = "result", nullable = false, length = 50)
    DeviceUsageResult result;

    @Column(name = "description", columnDefinition = "NVARCHAR(255)")
    String description;

    @Column(name = "created_at")
    LocalDateTime createdAt;

    @PrePersist
    void prePersist() {
        createdAt = LocalDateTime.now();
    }
}
