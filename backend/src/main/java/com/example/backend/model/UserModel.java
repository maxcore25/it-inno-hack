package com.example.backend.model;

public class UserModel {

    private Long id;
    private String email;
    private String password;
    private Boolean isDeleted;

    // Constructors
    public UserModel() {}

    public UserModel(Long id, String email, boolean isDeleted) {
        this.id = id;
        this.email = email;
        this.isDeleted = isDeleted;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }
}
