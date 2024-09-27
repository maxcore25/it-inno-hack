package com.example.backend.service;

import com.example.backend.entity.UserEntity;
import com.example.backend.model.UserDTO;
import com.example.backend.model.UserCreateDTO;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDTO createUser(UserCreateDTO userCreateDTO) {
        UserEntity newUser = new UserEntity(userCreateDTO.getEmail(), userCreateDTO.getPassword());
        UserEntity savedUser = userRepository.save(newUser);
        return mapToDTO(savedUser);
    }

    public List<UserDTO> findAllUsers() {
        return userRepository.findAll().stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    public UserDTO findUserById(Long id) {
        return userRepository.findById(id)
            .map(this::mapToDTO)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserDTO findUserByEmail(String email) {
        return userRepository.findByEmail(email)
            .map(this::mapToDTO)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) {
        UserEntity existingUser = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        existingUser.setEmail(userDTO.getEmail());
        existingUser.setPassword(userDTO.getPassword());
        existingUser.setIsDeleted(userDTO.getIsDeleted());

        UserEntity updatedUser = userRepository.save(existingUser);
        return mapToDTO(updatedUser);
    }

    public void deleteUser(Long id) {
        UserEntity user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
        user.setIsDeleted(true);
        userRepository.save(user);
    }

    private UserDTO mapToDTO(UserEntity userEntity) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(userEntity.getId());
        userDTO.setEmail(userEntity.getEmail());
        userDTO.setPassword(userEntity.getPassword());
        userDTO.setIsDeleted(userEntity.getIsDeleted());
        return userDTO;
    }
}
