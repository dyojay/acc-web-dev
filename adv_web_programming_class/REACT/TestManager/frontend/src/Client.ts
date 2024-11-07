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

export const getAllProjects = () => axios.get(`${BASE_URL}/projects`);


// Tasks API Calls
export const createTask = (task: Partial <Task>) =>
    axios.post<Task>(`${BASE_URL}/task`, task);

export const getAllTask=()=> axios.get(`${BASE_URL}/task`);

export const getTasksByProjectId = (id: number | undefined) =>
    axios.get(`${BASE_URL}/projects/${id}/task`);

export const updateTask = (task: Partial<Task> & { id: number }) =>
    axios.put(`${BASE_URL}/task/${task.id}`, task);





// Roles API calls
export const createRole = (role: Omit<Role, 'id'>) =>
    axios.post(`${BASE_URL}/roles`, role);
export const getAllRoles = () =>
    axios.get<Role[]>(`${BASE_URL}/roles`);