package com.exampleTest.TestManager.controller;


import com.exampleTest.TestManager.entity.Project;
import com.exampleTest.TestManager.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project newProject = projectService.createProject(project);
        return new ResponseEntity<>(newProject, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }
    @GetMapping("{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Project project = projectService.getProjectById(id);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteProjectById(@PathVariable Long id) {
        projectService.deleteProjectById(id);
        return ResponseEntity.ok("Project deleted");
    }
    @PutMapping("{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project project) {
        Project updatedProject = projectService.updateProject(id, project);
        return new ResponseEntity<>(updatedProject, HttpStatus.OK);
    }

    @PutMapping("/{id}/toggle")
    public ResponseEntity<Project> toggleProjectCompletion(@PathVariable Long id) {
        try {
            // Call the service method to toggle the completion status
            Project updatedProject = projectService.toggleCompletion(id);
            return ResponseEntity.ok(updatedProject);  // Return the updated project
        } catch (IllegalArgumentException e) {
            // Handle case where project is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }



}
