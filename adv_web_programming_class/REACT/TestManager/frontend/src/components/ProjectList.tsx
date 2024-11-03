import React, { useState, useEffect } from 'react';
import { createProject ,getAllProjects, getProjectById, getTasksByProjectId, updateTask } from "../Client.ts";
import {
    TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions,
    Box, Typography, CircularProgress, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, List, ListItem, ListItemText, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TaskList from "./TaskList.tsx";


interface Project {
    id: number;
    projectName: string;
    projectDescription: string;
    projectEndDate: Date | null;
    projectStatus: string;
    roles: Role[];
}

interface Task {
    id: number;
    name: string;
    description: string;
    startTime: Date;
    lastModified: Date;

}

interface Role {
    id: number;
    fullName: string;
    Role: string;
    email: string;
}

const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectEndDate, setProjectEndDate] = useState<Date | null>(null);
    const [projectStatus, setProjectStatus] = useState('');
    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [openTaskDialog, setOpenTaskDialog] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getAllProjects();
            setProjects(response.data);
            setFilteredProjects(response.data);
        } catch (error) {
            setError("Error occurred while fetching projects");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setFilteredProjects(
            projects.filter(project =>
                project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, projects]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleAddProject = async () => {
        if (projectName.trim()) {
            try {
                const newProject = {
                    projectName: projectName.trim(),
                    projectDescription,
                    projectEndDate,
                    projectStatus
                };
                const response = await createProject();
                setProjects([...projects, response.data]);
                setProjectName('');
                setProjectDescription('');
                setProjectEndDate(null);
                setProjectStatus('');
                setOpenDialog(false);
            } catch (error) {
                console.error('Error Adding New Project', error);
            }
        }
    };
    const handleProjectClick = async (project: Project) => {
        setSelectedProject(project);
        try {
            const response = await getTasksByProjectId(project.id);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };
    const handleAddRole = async (projectId: number, roleName: string) => {
        try {
            const response = await fetch(`http://localhost:8080/api/projects/${projectId}/Roles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: roleName }),
            });
            if (!response.ok) {
                throw new Error('Failed to add role');
            }
            const newRole = await response.json();
            setProjects(projects.map(p =>
                p.id === projectId ? {...p, roles: [...p.roles, newRole]} : p
            ));
        } catch (error) {
            console.error('Error Adding New Role', error);
        }
    };

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
        setOpenTaskDialog(true);
    };

    const handleTaskUpdate = async (updatedTask: Task) => {
        try {
            await updateTask(updatedTask);
            setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
            setOpenTaskDialog(false);
        } catch (error) {
            console.error('Error updating task', error);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
            <TextField
                fullWidth
                variant="outlined"
                label="Search Projects"
                value={searchTerm}
                onChange={handleSearch}
                sx={{ mb: 2 }}
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Project Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProjects.map((project) => (
                            <TableRow
                                key={project.id}
                                onClick={() => handleProjectClick(project)}
                                style={{cursor: 'pointer'}}
                            >
                                <TableCell>{project.projectName}</TableCell>
                                <TableCell>{project.projectDescription}</TableCell>
                                <TableCell>{project.projectEndDate ? new Date(project.projectEndDate).toLocaleDateString() : 'N/A'}</TableCell>
                                <TableCell>{project.projectStatus}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenDialog(true)}
                sx={{ mt: 2 }}
            >
                Add New Project
            </Button>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Add New Project</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Project Name"
                        fullWidth
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Description"
                        fullWidth
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Due Date"
                            value={projectEndDate}
                            onChange={(newValue) => setProjectEndDate(newValue)}
                            renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
                        />
                    </LocalizationProvider>
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="project-status-label">Project Status</InputLabel>
                        <Select
                            labelId="project-status-label"
                            id="project-status"
                            value={projectStatus}
                            label="Project Status"
                            onChange={(e) => setProjectStatus(e.target.value as string)}
                        >
                            <MenuItem value="Complete">Complete</MenuItem>
                            <MenuItem value="Pending Review">Pending Review</MenuItem>
                            <MenuItem value="Working">Working</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddProject}>Add</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={Boolean(selectedProject)} onClose={() => setSelectedProject(null)}>
                <DialogTitle>{selectedProject?.projectName} Tasks</DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Task Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Start Time</TableCell>
                                    <TableCell>Last Modified</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tasks.map((task) => (
                                    <TableRow
                                        key={task.id}
                                        onClick={() => handleTaskClick(task)}
                                        style={{cursor: 'pointer'}}
                                    >
                                        <TableCell>{task.name}</TableCell>
                                        <TableCell>{task.description}</TableCell>
                                        <TableCell>{new Date(task.startTime).toLocaleString()}</TableCell>
                                        <TableCell>{new Date(task.lastModified).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
            </Dialog>

            <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)}>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    {selectedTask && (
                        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="Task Name"
                                value={selectedTask.name}
                                onChange={(e) => setSelectedTask({...selectedTask, name: e.target.value})}
                            />
                            <TextField
                                label="Description"
                                value={selectedTask.description}
                                onChange={(e) => setSelectedTask({...selectedTask, description: e.target.value})}
                            />
                            {/* Add more fields as needed */}
                        </Box>
                    )}
                </DialogContent>
                {selectedProject && (
                    <Dialog open={Boolean(selectedProject)} onClose={() => setSelectedProject(null)}>
                        <DialogTitle>{selectedProject.projectName}</DialogTitle>
                        <DialogContent>
                            <Typography variant="h6">Roles</Typography>
                            <List>
                                {selectedProject.roles.map(role => (
                                    <ListItem key={role.id}>
                                        <ListItemText primary={role.fullName} />
                                    </ListItem>
                                ))}
                            </List>
                            {/* Add a form to add new roles */}
                        </DialogContent>
                    </Dialog>
                )}
                {selectedProject && (
                    <Dialog open={Boolean(selectedProject)} onClose={() => setSelectedProject(null)}>
                        <DialogTitle>{selectedProject.projectName} Tasks</DialogTitle>
                        <DialogContent>
                            <TaskList projectId={selectedProject.id} />
                        </DialogContent>
                    </Dialog>
                )}
                <DialogActions>
                    <Button onClick={() => setOpenTaskDialog(false)}>Cancel</Button>
                    <Button onClick={() => selectedTask && handleTaskUpdate(selectedTask)}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProjectList;