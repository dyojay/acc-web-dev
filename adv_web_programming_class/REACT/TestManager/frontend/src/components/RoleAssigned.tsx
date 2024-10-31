import React, { useState, FormEvent } from 'react';
import { TextField, Button, Stack, Box, Typography } from '@mui/material';

const RolesAssigned: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(firstName, lastName);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Role Assignment</Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
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

                </Stack>

                <Button variant="outlined" color="secondary" type="submit">Save Assignment</Button>
            </form>

        </Box>
    );
};

export default RolesAssigned;