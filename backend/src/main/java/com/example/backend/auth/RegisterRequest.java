package com.example.backend.auth;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@CrossOrigin
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String department;
    private String phoneno;
}
