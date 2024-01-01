package com.example.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@CrossOrigin
public interface UserRepository extends JpaRepository<User,Integer>
{
    Optional<User> findByEmail(String email);
    Optional<User> findById(Integer id);
    Optional<User> findByOtp(String Token);
}
