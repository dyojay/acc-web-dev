import axios from "axios";



const BASE_URL = 'http://localhost:8080/api/projects';

export const getAllProjects = () => axios.get(BASE_URL);