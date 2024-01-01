package com.example.backend.faculty;

import com.example.backend.user.Student;
import com.example.backend.user.StudentRepository;
import com.example.backend.user.User;
import com.example.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;



@RestController
@RequestMapping("/api/v1/faculty")
@RequiredArgsConstructor
@CrossOrigin()
public class FacultyController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    StudentRepository studentRepository;
    @GetMapping("/currentuser")
    public ResponseEntity<User> sayHello(Authentication authentication){
        Optional<User> user = userRepository.findByEmail(authentication.getName());
        return ResponseEntity.ok(user.get());
    }

    @GetMapping("/currentuserstudents/{id}")
    public ResponseEntity<List<Student>> getStudentsByUserId(@PathVariable Integer id) {
        Optional<List<Student>> l = studentRepository.findByUserId(id);//.orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(l.get());
    }
}
