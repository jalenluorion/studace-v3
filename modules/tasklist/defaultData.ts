import { Tables } from '@/database.types';

export const defaultTags = [
    { name: 'English', color: 'red' },
    { name: 'Math', color: 'blue' },
    { name: 'Science', color: 'green' },
    { name: 'History', color: 'purple' },
    { name: 'Art', color: 'orange' },
    { name: 'Other', color: 'black' },
];

export const defaultTasklist: Tables<'tasklist'> = {
    private_tasks: [],
    public_tasks: [],
    space_id: '',
    tags: defaultTags,
    tasks_complete: 0,
};
