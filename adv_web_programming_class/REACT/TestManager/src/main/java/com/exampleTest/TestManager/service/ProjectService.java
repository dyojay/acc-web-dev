package com.exampleTest.TestManager.service;

import com.exampleTest.TestManager.entity.Project;
import com.exampleTest.TestManager.repository.ProjectRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@AllArgsConstructor
@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public Project createProject(Project project){
        return projectRepository.save(project);
    }

}
