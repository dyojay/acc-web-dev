import axios from "axios";



const BASE_URL = 'http://localhost:8080/api/projects';

interface Project {
    id: number;
    projectName: string;
    projectDescription: string;
    projectEndDate: TimeStamp;
    projectStatus: string;

}

export const getAllProjects = () => axios.get(BASE_URL);
export const getAllProjectById = (Project.id) => axios.get(`${BASE_URL}/${id}`);