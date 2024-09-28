package com.example.backend.service;

import com.example.backend.entity.ProjectEntity;
import com.example.backend.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<ProjectEntity> getAllProjects() {
        return projectRepository.findAll();
    }

    public ProjectEntity createProject(ProjectEntity project) {
        return projectRepository.save(project);
    }
}
