package com.example.backend.service;

import com.example.backend.entity.UserEntity;
import com.example.backend.model.UserModel;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserModel createUser(UserModel userModel, String email) {
        if (userRepository.existsByUsername(userModel.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(userModel.getUsername());
        userEntity.setEmail(email);
        userEntity.setActive(true);
        userEntity.setRoles("USER");
        userEntity.setPassword(userModel.password);

        UserEntity savedUser = userRepository.save(userEntity);

        return new UserModel(savedUser.getId(), savedUser.getUsername(), savedUser.isActive());
    }

    public Optional<UserModel> getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(user -> new UserModel(user.getId(), user.getUsername(), user.isActive()));
    }
}
