import React, { useState, useEffect } from 'react';
import {createProject, getAllProjects, Project,getAllTask} from "../Client.ts";
import {
    TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions,
    Box, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper,FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {Route, Routes, useNavigate} from "react-router-dom";
import TaskList from "./TaskList.tsx";

interface ProjectList{
    projects: Project[];

}


interface Task {
    id: number;
    name: string;
    description: string;
    startTime: Date;
    lastModified: Date;

}

 const ProjectList = () => {
     const [projects, setProjects] = useState<Project[]>([]);
     const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
     const [searchTerm, setSearchTerm] = useState('');
     const [openDialog, setOpenDialog] = useState(false);
     //-----------------------------------------------------------------
     const [projectName, setProjectName] = useState('');
     const [projectDescription, setProjectDescription] = useState('');
     const [projectEndDate, setProjectEndDate] = useState<Date | null>(null);
     const [projectStatus, setProjectStatus] = useState('');
     const [selectedProject, setSelectedProject] = useState<Project | null>(null);
     //-----------------------------------------------------------------
     const [tasks, setTasks] = useState<Task[]>([]);
     const [selectedTask, setSelectedTask] = useState<Task | null>(null);
     //-----------------------------------------------------------------
     const [openTaskDialog, setOpenTaskDialog] = useState(false);
     const [loading, setIsLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);
     const navigate = useNavigate();


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

//Project Handlers-------------------------------------------------------------------------------------------
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
                     projectStatus,
                 };

                 const response = await createProject(newProject);

                 if (response.data) {
                     setProjects(prevProjects => [...prevProjects, response.data]);
                     // Reset form fields
                     setProjectName('');
                     setProjectDescription('');
                     setProjectEndDate(null);
                     setProjectStatus('');
                     setOpenDialog(true);

                 } else {
                     throw new Error('Failed to add project');
                 }
             } catch (error) {
                 console.error('Error Adding New Project', error);
             }
         } else {
             console.log('Project name cannot be empty');
         }
     }
     const handleProjectClick = async (project: Project) => {
         setSelectedProject(project);
         try {
             const response = await getAllTask();
             setTasks(response.data);
         } catch (error) {
             console.error('Error fetching tasks', error);
         }
     };


// Need to route this handleTaskClick to o a page

     // const handleTaskClick = () => {
     //    <Routes>
     //     <Route path="/task" />
     //    </Routes>
     // }
// ---------------------------------------------------------------
         return (
             <Box sx={{maxWidth: 800, margin: 'auto', mt: 4}}>
                 <TextField
                     fullWidth
                     variant="outlined"
                     label="Search Projects"
                     value={searchTerm}
                     onChange={handleSearch}
                     sx={{mb: 2}}
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
                     sx={{mt: 2}}
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
                                             onClick={() => handleTaskClick()}
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
                             <Box component="form" sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
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
                             </Box>
                         )}
                     </DialogContent>
                     <DialogActions>
                         <Button onClick={() => setOpenTaskDialog(false)}>Cancel</Button>
                         <Button onClick={() => selectedTask && handleTaskUpdate(selectedTask)}>Save</Button>
                     </DialogActions>
                 </Dialog>
             </Box>
         );
     };
export default ProjectList;