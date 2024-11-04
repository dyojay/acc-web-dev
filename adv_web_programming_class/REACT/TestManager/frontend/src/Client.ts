import axios from "axios";

const BASE_URL = 'http://localhost:8080/api';
export interface Project {
    id?: number;
    projectName: string;
    projectDescription: string;
    projectEndDate: Date | null;
    projectStatus: string;
}
// interface Role {
//     id: number;
//     fullName: string;
//     Role: string;
//     email: string;
// }
interface Task {
    id?: number;
    name: string;
    description: string;
    status: string;
    startTime: Date | null;
    lastModified: Date | null;
    projectName: Project;
}
//Projects api calls
export const createProject = (project: Project) =>
    axios.post(`${BASE_URL}/api/projects`, project);export const getAllProjects = () => axios.get(`${BASE_URL}/projects`);
// Task api Calls
export const createTask = (task: Omit<Task, 'id' | 'lastModified'>) =>
    axios.post<Task>(`${BASE_URL}/tasks`, task);
export const getTasksByProjectId = (projectId: number) => axios.get(`${BASE_URL}/projects/${projectId}/tasks`);
export const updateTask = (task: any) => axios.put(`${BASE_URL}/tasks/${task.id}`, task);

//Roles api calls