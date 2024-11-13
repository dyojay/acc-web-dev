import React, {useState} from "react";
import {Button, Checkbox, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {createProjects} from "../client.ts";
import {Project} from "../client.ts";

const ModifyDetail = () => {
 const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const projectStatus = false;

    const handleCancelClick = () => {
        navigate('/projects');
    };

    const handleSaveClick = () => {
        const newProject: Project = {
            projectName: name,        // Map to 'projectName'
            projectDescription: description, // Map to 'projectDescription'
            projectStatus,            // 'false' as the default status
        };

        console.log(newProject);

        createProjects(newProject).then((res) => {
            console.log(res.data)
            navigate('/projects');
        }).catch((err) => {
            console.log(err);
        })
    };


    return (
        <>
            <TextField
                label="Project Name"
                fullWidth
                name="projectName"
                value={name}
                onChange={(e)=> setName(e.target.value)}
                required
                margin="normal"
            />
            <TextField
                label="Project Description"
                fullWidth
                name="projectDescription"
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
                required
                margin="normal"
            />
            <Button  onClick={handleCancelClick}     >Cancel</Button>
            <Button   onClick={handleSaveClick}    >Save</Button>
        </>
    );
};

export default ModifyDetail;