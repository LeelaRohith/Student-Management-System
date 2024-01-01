package com.example.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student,Integer>
{
    Optional<Student> findByRollNumber(String rollNumber);
    void deleteById(Integer id);
    Optional<List<Student>> findByUserId(Integer userId);
}
