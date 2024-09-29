package com.example.backend.service;

import com.example.backend.entity.ColumnEntity;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.ColumnDTO;
import com.example.backend.repository.ColumnRepository;
import com.example.backend.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ColumnService {

    @Autowired
    private ColumnRepository columnRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public ColumnDTO create(ColumnDTO columnDTO) {
        ColumnEntity columnEntity = new ColumnEntity();
        columnEntity.setName(columnDTO.getName());
        columnEntity.setProject(projectRepository.findById(columnDTO.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found")));
        columnRepository.save(columnEntity);
        return mapToDTO(columnEntity);
    }

    public List<ColumnDTO> findAll() {
        return columnRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public ColumnDTO findById(Long id) {
        ColumnEntity column = columnRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Column not found"));
        return mapToDTO(column);
    }

    public ColumnDTO update(Long id, ColumnDTO columnDTO) {
        ColumnEntity column = columnRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Column not found"));
        column.setName(columnDTO.getName());
        columnRepository.save(column);
        return mapToDTO(column);
    }

    public void delete(Long id) {
        ColumnEntity column = columnRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Column not found"));
        column.setDeleted(true);  // Soft delete
        columnRepository.save(column);
    }

    // Mapper: Entity to DTO
    private ColumnDTO mapToDTO(ColumnEntity columnEntity) {
        return new ColumnDTO(
                columnEntity.getId(),
                columnEntity.getName(),
                columnEntity.isDeleted(),
                columnEntity.getProject().getId()
        );
    }
}
