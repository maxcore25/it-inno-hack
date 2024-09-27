package com.example.backend.model;

public class UserModel {

    private Long id;
    private String email;
    private String password;
    private Boolean isDeleted;

    // Constructors
    public UserModel() {}

    public UserModel(Long id, String username, boolean active) {
        this.id = id;
        this.username = username;
        this.active = active;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
