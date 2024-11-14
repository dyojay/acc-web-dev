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
    TableRow
} from "@mui/material";
import { useEffect, useState } from "react";
import {deleteProject, getProjects, toggleComplete} from "../Client.ts";
import {useNavigate} from "react-router-dom";  // Assuming `getProjects` is exported correctly



interface Project {
    id: number;
    projectName: string;
    projectDescription: string;
    projectStatus: boolean;
}

const ProjectList = () => {
    // Initialize the state with the correct type
    const [projects, setProjects] = useState<Project[]>([]);


const navigate= useNavigate();
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

    const handleAddTask = () => {
        navigate('/modify');
    };
    const handleUpdateTask = (id: number) => {};

    const handleDeleteTask = (id:number) => {
        deleteProject(id).then(() => {
            listAllProjects();
        }).catch((err) => {
            console.log(err)})

    };

    const handleToggleComplete = (id: number) => {
        toggleComplete(id).then((response) => {
            const updateProject = response.data;
            setProjects((prevTasks) =>
                prevTasks.map((projects:Project) =>
                    projects.id === id ? { ...projects, projectStatus: updateProject.projectStatus } : projects
                )
            );
        })
            .catch((error) => {
                console.error("Error toggling completion:", error);
            });
    };

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task Completion</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell>
                                    <Checkbox checked={project.projectStatus} onChange={()=> handleToggleComplete(project.id)} />
                                </TableCell>
                                <TableCell>{project.projectName}</TableCell>
                                <TableCell>{project.projectDescription}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleUpdateTask(project.id)}>Edit</Button>
                                    <Button onClick={() => handleDeleteTask(project.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" onClick={handleAddTask}>Add Task</Button>
        </Box>
    );
};

export default ProjectList;