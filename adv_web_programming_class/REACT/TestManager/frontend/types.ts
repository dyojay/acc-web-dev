export interface Task {
    id?: number;
    name: string;
    description: string;
    status: string;
    startTime: Date | string;
    lastModified?: Date | string;
    projectName: string | { id: number; projectName: string }; // Adjust this based on your actual data structure
}

export interface Role {
    id?: number;
    fullName: string;
    role: string;
    email: string;
}

