import React, { useState, useEffect } from 'react';
import {getAllProjects} from "../Client.ts";
import {
    TextField,
    List,
    ListItem,
    ListItemText,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Typography, CircularProgress
} from '@mui/material';

interface Project {
    id: number;
    projectName: string;
    projectDescription: string;
    projectEndDate: Date| null;
    projectStatus: string;
}

const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([])
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    //____________________________________________________________
    const [searchTerm, setSearchTerm] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [loading, setIsLoading] = useState(true);
    const[ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getAllProjects();
            setProjects(response.data);
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
        if (newProjectName.trim()) {
            try{
                const response  = await  fetch(`http://localhost:8080/api/projects/${newProjectName}`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({projectName: newProjectName.trim()}),
                });
                if (!response.ok) {
                    throw Error('Failed to add project');
                }
                const newProject =  await response.json();
            setProjects([...projects, newProject]);
            setNewProjectName('');
            setOpenDialog(false);
            } catch (error){
                console.error('Error Adding New Project', error);
            }
        }
    };
    if (loading) {
        return <CircularProgress />;
    }
    if (error) return <Typography color="error" >{error}</Typography>;
    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
            <TextField
                fullWidth
                variant="outlined"
                label="Search Projects"
                value={searchTerm}
                onChange={handleSearch}
                sx={{ mb: 2 }}
            />

            {filteredProjects.length > 0 ? (
                <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                    {filteredProjects.map((project) => (
                        <ListItem key={project.id}>
                            <ListItemText primary={project.projectName} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="body1" sx={{ textAlign: 'center', my: 2 }}>
                    No projects found. Add a new project?
                </Typography>
            )}

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
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddProject}>Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProjectList;