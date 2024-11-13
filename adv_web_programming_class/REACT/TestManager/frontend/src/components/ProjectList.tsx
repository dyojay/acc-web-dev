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
import { getProjects } from "../client";
import {useNavigate} from "react-router-dom";  // Assuming `getProjects` is exported correctly



interface Project {
    id: string;
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
    const handleUpdateTask = (id: string) => {};
    const handleDeleteTask = (id: string) => { };

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
                                    <Checkbox checked={project.projectStatus} />
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