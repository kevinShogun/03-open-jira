
interface SeedData {
	entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    createdAt: number;
    status: string;  
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Esta es una tarea',
            createdAt: Date.now(),
            status: 'pending'
        },
        {
            description: 'Esta es una tarea in Progress',
            createdAt: Date.now() - 10000,
            status: 'in-progress'
        },
        {
            description: 'Esta es una tarea finished',
            createdAt: Date.now() - 100000,
            status: 'finished'
        },
    ]
}
