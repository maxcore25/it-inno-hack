//package com.example.backend.controller;
//
//import com.example.backend.model.AuthenticationRequest;
//import com.example.backend.model.AuthenticationResponse;
//import com.example.backend.security.JwtUtil;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/auth")
//public class AuthenticationController {
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @Autowired
//    private UserDetailsService userDetailsService;
//
//    @Autowired
//    private JwtUtil jwtUtil;
//
//    @PostMapping("/login")
//    public AuthenticationResponse login(@RequestBody AuthenticationRequest request) throws Exception {
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
//        );
//
//        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
//        final String jwt = jwtUtil.generateToken(userDetails);
//
//        return new AuthenticationResponse(jwt);
//    }
//}
