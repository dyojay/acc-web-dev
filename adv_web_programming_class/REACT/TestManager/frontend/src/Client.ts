import axios from 'axios'

const BASE_URl = 'http://localhost:8080/api/projects'

export interface Project {
    id: number;
    projectName: string;
    projectDescription: string;
    projectStatus: boolean;
}


export const getProjects = () => axios.get(BASE_URl);
export const createProjects = (project:Project) => axios.post(BASE_URl ,project );
export const updateProject=()=> axios.put(BASE_URl);
// @ts-ignore
export const deleteProject=(id:number)=> axios.delete(BASE_URl + "/" + id);
export const toggleComplete=(id:number)=> axios.put(BASE_URl + "/" + id +"/toggle");