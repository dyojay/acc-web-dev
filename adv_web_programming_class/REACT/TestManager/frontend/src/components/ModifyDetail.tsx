import { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {createProjects, getProjectById, updateProject} from "../Client.ts";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const Update = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [project, setProject] = useState({
        id: 0,
        projectName: "",
        projectDescription: "",
        projectStatus: false
    });

    useEffect(() => {
        if (id) {
            getProjectById(Number(id)).then((response) => {
                setProject(response.data);
                console.error("Error fetching project:", error);
            });
        }
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProject((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        if (id) {
            updateProject(Number(id), project).then(() => {
                navigate('/projects');
            }).catch((error) => {
                console.error("Error updating project:", error);
            });
        } else {
            createProjects(project)
                    .then(() => {
                        navigate('/projects');
                    })
                    .catch((error) => {
                        console.error("Error creating project:", error);
                    });
            }
    };

    return (
        <Box sx={{ p: 2 }}>
            <h2>Edit Project</h2>
            <TextField
                label="Project Name"
                name="projectName"
                value={project.projectName}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Project Description"
                name="projectDescription"
                value={project.projectDescription}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{ mt: 2 }}
            >
                Save Changes
            </Button>
        </Box>
    );
};

export default Update;
