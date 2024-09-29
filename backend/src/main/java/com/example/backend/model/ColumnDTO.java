package com.example.backend.model;

public class ColumnDTO {

    private Long id;
    private String name;
    private boolean isDeleted;
    private Long projectId;

    // Constructors
    public ColumnDTO() {
    }

    public ColumnDTO(Long id, String name, boolean isDeleted, Long projectId) {
        this.id = id;
        this.name = name;
        this.isDeleted = isDeleted;
        this.projectId = projectId;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }
}
