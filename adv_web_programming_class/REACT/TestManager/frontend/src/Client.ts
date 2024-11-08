import axios from "axios";
import {Role, Task} from "../types.ts";

const BASE_URL = 'http://localhost:8080/api';

// Interfaces
export interface Project {
    id?: number;
    projectName: string;
    projectDescription: string;
    projectEndDate: Date | null;
    projectStatus: string;
    roles: Role[];
}


// Projects API calls
export const createProject = (project: Project) =>
    axios.post(`${BASE_URL}/projects`, project);

export const getAllProjects = () => axios.get(`${BASE_URL}/projects`);


// Tasks API Calls
export const createTask = (task: Partial <Task>) =>
    axios.post<Task>(`${BASE_URL}/task`, task);

export const getAllTask=()=> axios.get(`${BASE_URL}/task`);

export const getTasksByProjectId = (id: number | undefined) =>
    axios.get(`${BASE_URL}/projects/${id}/task`);

export const updateTask = async (task: Task): Promise<Task> => {
    const response = await axios.put(`/api/task/${task.id}`, task);
    return response.data;
};

export const deleteTask = async (taskId: number): Promise<void> => {
    const response = await axios.delete(`${BASE_URL}/task/${taskId}`);
    return response.data;
};


// Roles API calls
export const createRole = (role: Omit<Role, 'id'>) =>
    axios.post(`${BASE_URL}/roles`, role);
export const getAllRoles = () =>
    axios.get<Role[]>(`${BASE_URL}/roles`);