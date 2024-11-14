import { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById, updateProject } from "../Client.ts";

const Update = () => {
    const { id } = useParams<{ id: string }>(); // Get the project ID from the URL
    const navigate = useNavigate();

    const [project, setProject] = useState({
        id: 0,
        projectName: "",
        projectDescription: "",
        projectStatus: false
    });

    // Fetch the project data when the component mounts
    useEffect(() => {
        if (id) {
            getProjectById(Number(id)).then((response) => {
                setProject(response.data); // Populate the form with project data
            }).catch((error) => {
                console.error("Error fetching project:", error);
            });
        }
    }, [id]);

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProject((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission to update project
    const handleSave = () => {
        if (id) {
            updateProject(Number(id), project).then(() => {
                navigate('/'); // Redirect back to the project list after updating
            }).catch((error) => {
                console.error("Error updating project:", error);
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
