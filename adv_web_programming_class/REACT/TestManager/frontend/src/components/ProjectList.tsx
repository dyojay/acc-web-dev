import {
    Box,
    Button,
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Tooltip
} from "@mui/material";
import { useEffect, useState } from "react";
import { deleteProject, getProjects, toggleComplete } from "../Client.ts";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Project {
    id: number;
    projectName: string;
    projectDescription: string;
    projectStatus: boolean;
}

const ProjectList = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const navigate = useNavigate();

    // Fetch all projects
    const listAllProjects = async () => {
        try {
            const res = await getProjects();
            setProjects(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        listAllProjects();
    }, []);

    // Navigate to the "Modify" page
    const handleAddTask = () => {
        navigate('/modify');
    };
    const handleUpdateTask = (projectId:number) => {
        const projectToUpdate = projects.find(project => project.id === projectId);
        if (projectToUpdate) {
            navigate('/update', { state: { project: projectToUpdate } });
        }
    };
    //  project delete----------------------------------------------------------------------
    const handleDeleteTask = (id: number) => {
        deleteProject(id).then(() => {
            listAllProjects();
        }).catch((err) => {
            console.log(err);
        });
    };

    // Toggle project -----------------------------------------------------------------
    const handleToggleComplete = (id: number) => {
        toggleComplete(id).then((response) => {
            const updatedProject = response.data;
            setProjects((prevProjects) =>
                prevProjects.map((project) =>
                    project.id === id ? { ...project, projectStatus: updatedProject.projectStatus } : project
                )
            );
        }).catch((error) => {
            console.error("Error toggling completion:", error);
        });
    };

    return (
        <Box sx={{ p: 2 }}>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task Completion</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={project.projectStatus}
                                        onChange={() => handleToggleComplete(project.id)}
                                        color="primary"
                                    />
                                </TableCell>
                                <TableCell>{project.projectName}</TableCell>
                                <TableCell>{project.projectDescription}</TableCell>
                                <TableCell>
                                    <Tooltip title="Edit Project">
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleUpdateTask(project.id)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete Project">
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDeleteTask(project.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Button to add a new task */}
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddTask}
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        px: 4,
                        py: 1.5,
                    }}
                >
                    Add Project
                </Button>
            </Box>
        </Box>
    );
};
export default ProjectList;
