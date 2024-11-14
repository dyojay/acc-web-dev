package com.exampleTest.TestManager.service;

import com.exampleTest.TestManager.entity.Project;
import com.exampleTest.TestManager.repository.ProjectRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@AllArgsConstructor
@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public Project createProject(Project project){
        return projectRepository.save(project);
    }
    public List<Project> getAllProjects(){
        return projectRepository.findAll();
    }
    public Project getProjectById(Long id){
        return projectRepository.findById(id).orElse(null);
    }
    public void deleteProjectById(Long id){
        projectRepository.deleteById(id);
    }
    public Project updateProject(Long id, Project updateProject){
        Project existingProject = projectRepository.findById(id).orElse(null);
        assert existingProject != null;
        existingProject.setProjectName(updateProject.getProjectName());
        existingProject.setProjectDescription(updateProject.getProjectDescription());
        existingProject.setProjectStatus(updateProject.getProjectStatus());
        return projectRepository.save(existingProject);
    }

    public Project toggleCompletion(Long id) {
        Project existingProject = projectRepository.findById(id).orElse(null);
        if (existingProject == null) {
            throw new IllegalArgumentException("Project with id " + id + " not found");
        }
        existingProject.setProjectStatus(!existingProject.getProjectStatus());
        return projectRepository.save(existingProject);
    }



}
