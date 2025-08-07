import { defaultTasklist } from './defaultData';
import Tasklist from './component';
import { Tables } from '@/database.types';
import type { BaseModule } from '../types';

export type TasklistModule = BaseModule<Tables<'tasklist'>>;

const defaultTasklistModule: TasklistModule = {
    name: 'tasklist',
    size: '3x2',
    data: defaultTasklist,
    component: Tasklist,
};

export default defaultTasklistModule;
