import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
    Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem
} from '@mui/material';
import { getTasksByProjectId, updateTask } from '../Client';
import { Task } from '../../types';

const TaskList: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const location = useLocation();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            if (projectId) {
                try {
                    const response = await getTasksByProjectId(Number(projectId));
                    setTasks(response.data);
                } catch (error) {
                    console.error('Error fetching tasks:', error);
                }
            }
        };

        fetchTasks();
    }, [projectId]);

    const handleTaskUpdate = async (task: Task) => {
        try {
            const response = await updateTask(task);
            setTasks(tasks.map(t => t.id === task.id ? response.data : t));
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <Box>
            <h2>Tasks for Project {projectId}</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>Last Modified</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow
                                key={task.id}
                                style={{backgroundColor: task.id === location.state?.taskId ? '#e3f2fd' : 'inherit'}}
                            >
                                <TableCell>{task.name}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>
                                    <Select
                                        value={task.status}
                                        onChange={(e) => handleTaskUpdate({ ...task, status: e.target.value as string })}
                                    >
                                        <MenuItem value="To Do">To Do</MenuItem>
                                        <MenuItem value="In Progress">In Progress</MenuItem>
                                        <MenuItem value="Done">Done</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell>{new Date(task.startTime).toLocaleString()}</TableCell>
                                <TableCell>{task.lastModified ? new Date(task.lastModified).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell>
                                    <Button onClick={() => setEditingTask(task)}>
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={!!editingTask} onClose={() => setEditingTask(null)}>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    {editingTask && (
                        <>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Task Name"
                                value={editingTask.name}
                                onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Description"
                                value={editingTask.description}
                                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                            />
                            <Select
                                fullWidth
                                margin="dense"
                                value={editingTask.status}
                                onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value as string })}
                            >
                                <MenuItem value="To Do">To Do</MenuItem>
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="Done">Done</MenuItem>
                            </Select>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditingTask(null)}>Cancel</Button>
                    <Button onClick={() => {
                        if (editingTask) {
                            handleTaskUpdate(editingTask);
                            setEditingTask(null);
                        }
                    }}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TaskList;