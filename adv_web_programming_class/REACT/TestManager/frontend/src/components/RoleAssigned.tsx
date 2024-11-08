import React, { useState, useEffect, FormEvent } from 'react';
import {
    TextField,
    Button,
    Stack,
    Box,
    Typography,
    Select,
    MenuItem,
    TableContainer,
    Table,
    Paper,
    TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
import { createRole, getAllRoles } from "../Client"; // Import the API functions
import { useNavigate } from "react-router-dom";
import { Role } from '../../types'; // Make sure to import your Role type if needed

const RolesAssigned: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [rolesList, setRolesList] = useState<Role[]>([]); // State for roles
    const navigate = useNavigate();
    const [assignedRoles, setAssignedRoles] = useState<{ id: number; fullName: string; role: string; email: string }[]>([]);
    // Fetch roles when the component mounts
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await getAllRoles();
                console.log(response.data); // Log roles to verify they are fetched correctly
                setRolesList(response.data); // Assuming response.data is an array of Role objects
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRoles();
    }, []);



    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newRole = { fullName, role, email };
        createRole(newRole)
            .then((response) => {
                console.log(response);
                // Add the newly assigned role to the list
                setAssignedRoles([...assignedRoles, { id: response.data.id, fullName, role, email }]);
                navigate("/Roles"); // Redirect after successful creation
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Box sx={{maxWidth: 800, margin: 'auto', mt: 4}}>
            <Typography variant="h4" gutterBottom>Role Assignment</Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Full Name"
                        onChange={e => setFullName(e.target.value)}
                        value={fullName}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Role"
                        onChange={e => setRole(e.target.value)}
                        value={role}
                        fullWidth
                        required
                    />
                    <Select
                        variant='outlined'
                        color='secondary'
                        label="Role"
                        value={role}
                        fullWidth
                        required
                    >
                        {rolesList.map((roleItem) => (
                            <MenuItem key={roleItem.id} value={roleItem.role}>{roleItem.role}</MenuItem>
                        ))}
                    </Select>
                </Stack>
                <Button variant="outlined" color="secondary" type="submit">Save Assignment</Button>
            </form>
            <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>Assigned Roles:</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {assignedRoles.map((assignedRole) => (
                            <TableRow key={assignedRole.id}>
                                <TableCell>{assignedRole.id}</TableCell>
                                <TableCell>{assignedRole.fullName}</TableCell>
                                <TableCell>{assignedRole.role}</TableCell>
                                <TableCell>{assignedRole.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default RolesAssigned;