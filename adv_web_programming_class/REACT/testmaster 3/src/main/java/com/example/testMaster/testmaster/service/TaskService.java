package com.example.testMaster.testmaster.service;

import com.example.testMaster.testmaster.entity.Task;
import com.example.testMaster.testmaster.repo.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepo taskRepo;

    public List<Task> getAllTasks() {
        return taskRepo.findAll();
    }

    public Task saveTask(Task task) {
        return taskRepo.save(task);
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepo.findById(id);
    }

    public void deleteTask(Long id) {
        taskRepo.deleteById(id);
    }
}