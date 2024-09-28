package com.example.backend.service;

import com.example.backend.entity.ProjectEntity;
import com.example.backend.model.ProjectDTO;
import com.example.backend.model.ProjectCreateDTO;
import com.example.backend.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public ProjectDTO createProject(ProjectCreateDTO projectCreateDTO) {
        ProjectEntity newProject = new ProjectEntity(projectCreateDTO.getTitle(), projectCreateDTO.getDescription());
        ProjectEntity savedProject = projectRepository.save(newProject);
        return mapToDTO(savedProject);
    }

    public List<ProjectDTO> findAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public ProjectDTO findProjectById(Long id) {
        return projectRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    public ProjectDTO updateProject(Long id, ProjectDTO projectDTO) {
        ProjectEntity existingProject = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        existingProject.setTitle(projectDTO.getTitle());
        existingProject.setDescription(projectDTO.getDescription());
        existingProject.setIsDeleted(projectDTO.getIsDeleted());

        ProjectEntity updatedProject = projectRepository.save(existingProject);
        return mapToDTO(updatedProject);
    }

    public void deleteProject(Long id) {
        ProjectEntity project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        project.setIsDeleted(true);
        projectRepository.save(project);
    }

    private ProjectDTO mapToDTO(ProjectEntity projectEntity) {
        ProjectDTO projectDTO = new ProjectDTO();
        projectDTO.setId(projectEntity.getId());
        projectDTO.setTitle(projectEntity.getTitle());
        projectDTO.setDescription(projectEntity.getDescription());
        projectDTO.setIsDeleted(projectEntity.getIsDeleted());
        return projectDTO;
    }
}
