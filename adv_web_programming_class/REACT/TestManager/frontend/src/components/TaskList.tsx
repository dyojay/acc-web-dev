import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
    Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import {
    createTask, deleteTask,
    getAllTask,
    getTasksByProjectId,
    updateTask
} from '../Client';
import { Task } from '../../types';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

const TaskList: React.FC = () => {
    const { projectId } = useParams<{ projectId: string | undefined }>();
    const location = useLocation();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    //@ts-expect-error
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [openTaskDialog, setOpenTaskDialog] = useState(false);

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskStartDate, setTaskStartDate] = useState<Date | null>(null);
    const [taskStatus, setTaskStatus] = useState('');


    useEffect(() => {
        fetchTasks();
    }, [projectId]);

    const fetchTasks = async () => {
        setIsLoading(true);
        setError(null);
        try {
            let response;
            if (projectId) {
                response = await getTasksByProjectId(Number(projectId));
            } else {
                response = await getAllTask();
            }
            setTasks(response.data);
        } catch (error) {
            setError("Error occurred while fetching tasks");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddTask = async () => {
        try {
            const newTask = {
                name: taskName,
                description: taskDescription,
                startDate: taskStartDate,
                status: taskStatus,
                projectId: projectId,
            };

            const response = await createTask(newTask);

            if (response.data) {
                setTasks([...tasks, response.data]);
                // Reset form fields
                setTaskName('');
                setTaskDescription('');
                setTaskStartDate(null);
                setTaskStatus('');
                setOpenTaskDialog(false);
                roles:[]
            } else {
                throw new Error('Failed to add task');
            }
        } catch (error) {
            console.error('Error Adding New Task', error);
        }
    }
    const handleDeleteTask = async (task: Task) => {
        if (!task.id) return;

        try {
            await deleteTask(task.id);
            // Remove the deleted task from the tasks state
            setTasks(tasks.filter(t => t.id !== task.id));
        } catch (error) {
            console.error('Error deleting task:', error);
            // Optionally, show an error message to the user
        }
    };
    const handleTaskUpdate = async (task: Task) => {
        try {
            const response = await updateTask(task);
            setTasks(tasks.map(t => t.id === task.id ? response : t));
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const filteredTasks = tasks?.filter(task =>
        task?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false
    ) ?? [];

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Last Modified</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTasks.map((task) => (
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
                                <TableCell>{task.lastModified ? new Date(task.lastModified).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell>

                                    <Button onClick={() => setEditingTask(task)}>
                                        Edit
                                    </Button>
                                    <Button onClick={() => handleDeleteTask(task)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenTaskDialog(true)}
                sx={{ mt: 2 }}
            >
                Add New Task
            </Button>

            <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)}>
                <DialogTitle>Assign New Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Project"
                        fullWidth
                        value={projectId}
                        onChange={(e) => projectId(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Task Name"
                        fullWidth
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Description"
                        fullWidth
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Due Date"
                            value={taskStartDate}
                            onChange={(newValue) => setTaskStartDate(newValue)}
                        />
                    </LocalizationProvider>
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="task-status-label">Task Status</InputLabel>
                        <Select
                            labelId="task-status-label"
                            id="task-status"
                            value={taskStatus}
                            label="Task Status"
                            onChange={(e) => setTaskStatus(e.target.value as string)}
                        >
                            <MenuItem value="Complete">Complete</MenuItem>
                            <MenuItem value="Pending Review">Pending Review</MenuItem>
                            <MenuItem value="Working">Working</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenTaskDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddTask}>Add</Button>
                </DialogActions>
            </Dialog>

            <Dialog fullScreen={true} open={!!editingTask} onClose={() => setEditingTask(null)}>
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
                            <InputLabel id="task-status-label">Task Status</InputLabel>
                            <Select
                                id="task-status"
                                labelId="task-status-label"
                                margin="dense"
                                value={editingTask.status}
                                onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value as string })}
                             variant="standard">
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