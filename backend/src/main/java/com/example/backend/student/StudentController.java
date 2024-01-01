package com.example.backend.student;

import com.example.backend.user.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin()
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class StudentController {
    @Autowired
    StudentRepository studentRepo;
    @Autowired
    UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/addstudent/{id}")
    public ResponseEntity<Addresponse> add(@RequestBody Student student,@PathVariable Integer id)
    {
        Optional<User> user= userRepo.findById(id);
        student.setUser(user.get());
        studentRepo.save(student);
        return ResponseEntity.ok(Addresponse.builder().text("Student added successfully").build());
    }
    @PutMapping("/editstudent/{id}")
    public ResponseEntity<Addresponse> edit(@RequestBody Student student,@PathVariable
                                            Integer id)
    {
        Optional<User> user=userRepo.findById(id);
        student.setUser(user.get());
        Optional<Student> st=studentRepo.findByRollNumber(student.getRollNumber());
        st.get().setName(student.getName());
        st.get().setDepartment(student.getDepartment());
        st.get().setYear(student.getYear());
        st.get().setSemester(student.getSemester());
        st.get().setPhoneNumber(student.getPhoneNumber());
        st.get().setUser(student.getUser());
        studentRepo.save(st.get());
        return ResponseEntity.ok(Addresponse.builder().text("Student details updated successfully").build());
    }
    @PostMapping("/deletestudent/{id}")
    public ResponseEntity<Addresponse> delete(@RequestBody Student student,@PathVariable Integer id)
    {
//        Optional<User> user= userRepo.findById(id);
//        student.setUser(user.get());
        Optional<Student> st=studentRepo.findByRollNumber(student.getRollNumber());
        studentRepo.deleteById(st.get().getId());
        return ResponseEntity.ok(Addresponse.builder().text(st.get().getName()+" Deleted Successfully").build());
    }

}
