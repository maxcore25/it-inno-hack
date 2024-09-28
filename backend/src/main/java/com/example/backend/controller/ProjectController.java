package com.example.backend.controller;

import com.example.backend.model.ProjectDTO;
import com.example.backend.model.ProjectCreateDTO;
import com.example.backend.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectCreateDTO projectCreateDTO) {
        ProjectDTO newProject = projectService.createProject(projectCreateDTO);
        return ResponseEntity.ok(newProject);
    }

    @GetMapping
    public ResponseEntity<List<ProjectDTO>> findAllProjects() {
        List<ProjectDTO> projects = projectService.findAllProjects();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> findProjectById(@PathVariable Long id) {
        ProjectDTO project = projectService.findProjectById(id);
        return ResponseEntity.ok(project);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectDTO> updateProject(@PathVariable Long id, @RequestBody ProjectDTO projectDTO) {
        ProjectDTO updatedProject = projectService.updateProject(id, projectDTO);
        return ResponseEntity.ok(updatedProject);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}