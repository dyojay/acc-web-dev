import axios from 'axios'

const BASE_URl = 'http://localhost:8080/api/projects'

export interface Project {
    id: string;
    projectName: string;
    projectDescription: string;
    projectStatus: boolean;
}


export const getProjects = () => axios.get(BASE_URl);
export const createProjects = (project:Project) => axios.post(BASE_URl ,project );
export const updateProject=()=> axios.put(BASE_URl);
export const deleteProject=()=> axios.delete(BASE_URl);