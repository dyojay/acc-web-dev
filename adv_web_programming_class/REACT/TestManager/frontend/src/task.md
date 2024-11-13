// For tasks
const [tasks, setTasks] = useState<Task[]>([]);
const [selectedTask, setSelectedTask] = useState<Task | null>(null);
const [openTaskDialog, setOpenTaskDialog] = useState(false);

    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();







const handleTaskUpdate = async (updatedTask: Task) => {
try {
const updatedTaskData = await updateTask(updatedTask);
setTasks(prevTasks => prevTasks.map(task =>
task.id === updatedTaskData.id ? updatedTaskData : task
));
setOpenTaskDialog(false);
console.log('Task updated successfully');
} catch (error) {
console.error('Error updating task:', error);
}
};

    const handleTaskClick = (projectId: Task['id']) => {
        navigate(`/task/${projectId}`);
    };


