package com.example.backend.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@CrossOrigin
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String rollNumber;
    private String department;
    private String year;
    private String semester;
    private String phoneNumber;
    @ManyToOne
    @JoinColumn(name = "user_id") // This column will store the user_id as a foreign key
    private User user;
}
