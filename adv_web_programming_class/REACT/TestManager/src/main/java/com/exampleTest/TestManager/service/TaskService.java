package com.exampleTest.TestManager.service;


import com.exampleTest.TestManager.entity.Task;
import com.exampleTest.TestManager.repository.TaskRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;


@AllArgsConstructor
@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }
    public Task getTaskById(Long id){
        return taskRepository.findById(id).orElse(null);
    }
    public void deleteTaskById(Long id){
        taskRepository.deleteById(id);
    }

    public Task updateTask(Task updatedTask, Long id) {
        Task existingTask = taskRepository.findById(id).orElse(null);
        assert existingTask != null;
        existingTask.setName(updatedTask.getName());
        existingTask.setDescription(updatedTask.getDescription());
        return taskRepository.save(existingTask);
    }

}
