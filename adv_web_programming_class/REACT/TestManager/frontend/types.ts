
export interface Task {
    id?: number | null;
    name: string;
    description: string;
    status: string;
    startTime: Date | null;
    lastModified?: Date | null;
    project:number | null;
    // Adjust this based on your actual data structure
}

export interface Role {
    id?: number;
    fullName: string;
    role: string;
    email: string;
}

