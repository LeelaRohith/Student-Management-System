package com.example.backend.password;

import com.example.backend.user.User;
import com.example.backend.user.UserRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.io.UnsupportedEncodingException;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin
public class ForgetPasswordController {
    @Autowired
    EmailService emailService;
    @Autowired
    UserRepository userRepo ;
    Optional<User> resetUser;
    private final PasswordEncoder passwordEncoder;
    @PostMapping("/resetpassword")
    public ResponseEntity<passwordResponse> check(@RequestBody ResetEmail resetEmail) throws MessagingException {
        //service.sendEmail("leelarohith10@gmail.com","testmail","just testing mail feature");

        Optional<User> user = userRepo.findByEmail(resetEmail.getEmail());

        if(!user.isPresent())
        {
            return ResponseEntity.ok(passwordResponse.builder().text("user doesn't exist ").userExists(false).build());
        }
        // String passwordToken = UUID.randomUUID().toString();
        Random random = new Random();
        String otp = String.format("%04d", random.nextInt(10000));
        user.get().setName(user.get().getName());
        user.get().setPassword(user.get().getPassword());
        user.get().setDepartment(user.get().getDepartment());
        user.get().setPhoneno(user.get().getPhoneno());

        user.get().setRole(user.get().getRole());

        user.get().setOtp(otp);
        userRepo.save(user.get());
        this.resetUser=user;

        String emailBody="<p>Hello "+user.get().getName()+",</p>"
                + "<p>You have requested to reset your password.</p>"
                + "<p>OTP for resetting your password:</p>"
                + "<p> "+otp+ "</p>"
                + "<br>"
                + "<p>Ignore this email if you do remember your password, "
                + "or you have not made the request.</p>";
        emailService.sendEmail(resetEmail.getEmail(),"Password Reset",emailBody);
        return ResponseEntity.ok(passwordResponse.builder().text("We have sent otp to your email. Please check.").userExists(true).build());
    }
    @PostMapping("/validateotp")
    public ResponseEntity<Validateresponse> validateotp(@RequestBody Otp otp)
    {

        if(!(resetUser.get().getOtp().equals(otp.getOtp())))
        {
            return ResponseEntity.ok(Validateresponse.builder().text("Invalid otp").otpAuthentication(false).build());
        }
        return ResponseEntity.ok(Validateresponse.builder().text("Please enter your password").otpAuthentication(true).build());
    }
    @PostMapping("/updatepassword")
    public ResponseEntity<UpdateResponse> updatepassword(@RequestBody Updatedpassword updatedPassword)
    {
        //return ResponseEntity.ok(UpdateResponse.builder().text(updatedPassword.getPassword()).build());

        resetUser.get().setName(resetUser.get().getName());
        resetUser.get().setPassword(passwordEncoder.encode(updatedPassword.getPassword()));
        resetUser.get().setDepartment(resetUser.get().getDepartment());
        resetUser.get().setPhoneno(resetUser.get().getPhoneno());
        resetUser.get().setRole(resetUser.get().getRole());
        resetUser.get().setOtp(null);
        userRepo.save(resetUser.get());
        return ResponseEntity.ok(UpdateResponse.builder().text("Password updated Successfully").build());
    }
}