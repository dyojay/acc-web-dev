import axios from "axios";

const BASE_URL = 'http://localhost:8080/api';
export interface Project {
    id?: number;
    projectName: string;
    projectDescription: string;
    projectEndDate: string | null;
    projectStatus: string;
}
export const createProject = (project: Project) =>
    axios.post(`${BASE_URL}/api/projects`, project);export const getAllProjects = () => axios.get(`${BASE_URL}/projects`);
export const getProjectById = (id: number) => axios.get(`${BASE_URL}/projects/${id}`);
export const getTasksByProjectId = (projectId: number) => axios.get(`${BASE_URL}/projects/${projectId}/tasks`);
export const updateTask = (task: any) => axios.put(`${BASE_URL}/tasks/${task.id}`, task);