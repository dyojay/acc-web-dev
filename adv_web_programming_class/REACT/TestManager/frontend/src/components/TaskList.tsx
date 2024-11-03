// TaskList.tsx

import React, { useState, useEffect } from 'react';
import { getTasksByProjectId } from "../Client.ts";
import {
    List, ListItem, ListItemText, CircularProgress, Typography
} from '@mui/material';

interface Task {
    id: number;
    name: string;
    description: string;
    startTime: Date;
    lastModified: Date;
    roles: Role[];  // Add this line

}
interface Role {
    id: number;
    fullName: string;
    Role: string;
    email: string;
}

interface TaskListProps {
    projectId: number;
}

const TaskList: React.FC<TaskListProps> = ({ projectId }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleAddRoleToTask = async (taskId: number, roleName: string) => {
        try {
            const response = await fetch(`http://localhost:8080/api/tasks/${taskId}/Roles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: roleName }),
            });
            if (!response.ok) {
                throw new Error('Failed to add role to task');
            }
            const newRole = await response.json();
            setTasks(tasks.map(t =>
                t.id === taskId ? {...t, roles: [...t.roles, newRole]} : t
            ));
        } catch (error) {
            console.error('Error Adding Role to Task', error);
        }
    };
    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getTasksByProjectId(projectId);
                setTasks(response.data);
            } catch (error) {
                setError("Error occurred while fetching tasks");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [projectId]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <List>
            {tasks.map((task) => (
                <ListItem key={task.id}>
                    <ListItemText
                        primary={task.name}
                        secondary={
                            <>
                                {`Last modified: ${new Date(task.lastModified).toLocaleString()}`}
                                <Typography component="span" variant="body2">
                                    Roles: {task.roles.map(r => r.name).join(', ')}
                                </Typography>
                            </>
                        }
                    />
                    {/* Add a button or form to add roles to this task */}
                </ListItem>
            ))}
        </List>
    );
};

export default TaskList;