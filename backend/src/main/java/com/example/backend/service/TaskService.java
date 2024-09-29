package com.example.backend.service;

import com.example.backend.entity.ColumnEntity;
import com.example.backend.entity.TaskEntity;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.TaskDTO;
import com.example.backend.repository.TaskRepository;
import com.example.backend.repository.ColumnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ColumnRepository columnRepository;

    public TaskDTO create(TaskDTO taskDTO) {
        TaskEntity taskEntity = new TaskEntity();
        taskEntity.setTitle(taskDTO.getTitle());
        taskEntity.setDescription(taskDTO.getDescription());
        taskEntity.setTodoList(taskDTO.getTodoList());
        taskEntity.setDeadline(taskDTO.getDeadline());
        taskEntity.setColumn(columnRepository.findById(taskDTO.getColumnId())
                .orElseThrow(() -> new ResourceNotFoundException("Column not found")));
        taskRepository.save(taskEntity);
        return mapToDTO(taskEntity);
    }

    public List<TaskDTO> findAll() {
        return taskRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public TaskDTO findById(Long id) {
        TaskEntity task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        return mapToDTO(task);
    }

    public List<TaskDTO> findByColumnId(Long columnId) {
        return taskRepository.findByColumnId(columnId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public TaskDTO update(Long id, TaskDTO taskDTO) {
        TaskEntity task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setTodoList(taskDTO.getTodoList());
        task.setDeadline(taskDTO.getDeadline());
        taskRepository.save(task);
        return mapToDTO(task);
    }

    public void delete(Long id) {
        TaskEntity task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        taskRepository.delete(task);
    }

    // Mapper: Entity to DTO
    private TaskDTO mapToDTO(TaskEntity taskEntity) {
        return new TaskDTO(
                taskEntity.getId(),
                taskEntity.getTitle(),
                taskEntity.getDescription(),
                taskEntity.getTodoList(),
                taskEntity.getDeadline(),
                taskEntity.getColumn().getId()
        );
    }
}
