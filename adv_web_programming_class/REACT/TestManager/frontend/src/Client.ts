import axios from 'axios';

const BASE_URl = 'http://localhost:8080/api/projects';

export interface Project {
    id: number;
    projectName: string;
    projectDescription: string;
    projectStatus: boolean;
}

// Fetch all projects
export const getProjects = () => axios.get(BASE_URl);

// Create a new project
export const createProjects = (project: Project) => axios.post(BASE_URl, project);

// Get a single project by ID
export const getProjectById = (id: number) => {
    return axios.get(`${BASE_URl}/${id}`); // Use BASE_URL with the ID appended
};

// Update a project
export const updateProject = (id: number, project: Project) => {
    return axios.put(`${BASE_URl}/${id}`, project); // Use BASE_URL with the ID appended
};

// Delete a project by ID
export const deleteProject = (id: number) => axios.delete(`${BASE_URl}/${id}`);

// Toggle project completion status
export const toggleComplete = (id: number) => axios.put(`${BASE_URl}/${id}/toggle`);
