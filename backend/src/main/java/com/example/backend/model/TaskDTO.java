package com.example.backend.model;

import java.time.LocalDateTime;

public class TaskDTO {

    private Long id;
    private String title;
    private String description;
    private String todoList;
    private LocalDateTime deadline;
    private Long columnId;

    // Constructors
    public TaskDTO() {}

    public TaskDTO(Long id, String title, String description, String todoList, LocalDateTime deadline, Long columnId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.todoList = todoList;
        this.deadline = deadline;
        this.columnId = columnId;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTodoList() {
        return todoList;
    }

    public void setTodoList(String todoList) {
        this.todoList = todoList;
    }

    public LocalDateTime getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDateTime deadline) {
        this.deadline = deadline;
    }

    public Long getColumnId() {
        return columnId;
    }

    public void setColumnId(Long columnId) {
        this.columnId = columnId;
    }
}
