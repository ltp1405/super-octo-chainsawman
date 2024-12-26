interface Task {
    id: number;
    name: string;
    description: string;
    progress: number;
    deadline: string;
    assignee: string;
    activities: Activity[];
}

interface TaskOverview {
    id: number;
    name: string;
    progress: number;
}