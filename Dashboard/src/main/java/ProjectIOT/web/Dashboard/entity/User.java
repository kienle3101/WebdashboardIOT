package ProjectIOT.web.Dashboard.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tbl_user")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    
    @Column(columnDefinition = "NVARCHAR(150)")
    String fullName;
    String username;
    String password;

    @ManyToMany
    Set<Role> roles;

    @ManyToMany
    @JoinTable(
            name = "user_permissions",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "permission_name")
    )
    private Set<Permission> permissions = new HashSet<>();
}
