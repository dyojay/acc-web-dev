import React, { useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import {Project, updateProject} from '../Client';  // Assuming you have this API function

const Update = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        const projectData = location.state?.project;
        if (projectData) {
            setProject(projectData);
        } else {
            navigate('/');
        }
    }, [location.state, navigate]);

    const handleSave = async () => {
        if (project) {
            try {
                // Call  API --------------------------------------------------------------
                await updateProject(project.id, project);
                navigate('/');
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (project) {
            setProject({
                ...project,
                [e.target.name]: e.target.value,
            });
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            {project ? (
                <>
                    <TextField
                        label="Project Name"
                        name="projectName"
                        value={project.projectName}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Project Description"
                        name="projectDescription"
                        value={project.projectDescription}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                    >
                        Save Changes
                    </Button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </Box>
    );
};

export default Update;
