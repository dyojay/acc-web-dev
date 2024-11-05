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
}


// Projects API calls
export const createProject = (project: Project) =>
    axios.post(`${BASE_URL}/projects`, project);

export const getAllProjects = () =>
    axios.get(`${BASE_URL}/projects`);


// Tasks API Calls
export const createTask = (task: Omit<Task, 'id' | 'lastModified'>) =>
    axios.post<Task>(`${BASE_URL}/tasks`, task);

export const getTasksByProjectId = (id: number | undefined) =>
    axios.get(`${BASE_URL}/projects/${id}/tasks`);

export const updateTask = (task: Partial<Task> & { id: number }) =>
    axios.put(`${BASE_URL}/tasks/${task.id}`, task);





// Roles API calls
export const createRole = (role: Omit<Role, 'id'>) =>
    axios.post(`${BASE_URL}/roles`, role);
export const getAllRoles = () =>
    axios.get<Role[]>(`${BASE_URL}/roles`);