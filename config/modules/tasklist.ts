import { Tables } from '@/database.types';
import Tasklist from '@/components/modules/tasklist';

const defaultTags = [
    {
        name: 'English',
        color: 'red',
    },
    {
        name: 'Math',
        color: 'blue',
    },
    {
        name: 'Science',
        color: 'green',
    },
    {
        name: 'History',
        color: 'purple',
    },
    {
        name: 'Art',
        color: 'orange',
    },
    {
        name: 'Other',
        color: 'black',
    },
];

const defaultTasklist: Tables<'tasklist'> = {
    private_tasks: [],
    public_tasks: [],
    space_id: '',
    tags: defaultTags,
    tasks_complete: 0,
};

export interface TasklistModule {
    name: string;
    size: string;
    default: Tables<'tasklist'>;
    component: (props: { data: Tables<'tasklist'> }) => JSX.Element;
}

const tasklistModule: TasklistModule = {
    name: 'tasklist',
    size: '3x2',
    default: defaultTasklist,
    component: Tasklist,
};

export default tasklistModule;
