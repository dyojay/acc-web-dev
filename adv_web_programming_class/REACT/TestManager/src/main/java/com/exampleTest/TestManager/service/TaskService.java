package com.exampleTest.TestManager.service;


import com.exampleTest.TestManager.entity.Task;
import com.exampleTest.TestManager.repository.TaskRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

}
