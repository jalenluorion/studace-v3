import { Database, Tables } from '@/database.types';

// Modules
import tasklistModule from '@/config/modules/tasklist';
import timerModule from '@/config/modules/timer';

export type AllDataTypes = Database['public']['Tables'][keyof Database['public']['Tables']]['Row'];
export type AllSupabaseModules = keyof Database['public']['Tables'];

export const allModules = [tasklistModule, timerModule];

const defaultModules = [tasklistModule, timerModule];

export const defaultSpace: Tables<'space'> = {
    allowed_users: [],
    background: 'c0_ejQQcrwI',
    is_public: false,
    last_opened: null,
    modules: defaultModules.map((module) => module.name),
    name: 'Studace Space',
    owner_id: '',
    school: null,
    space_id: '',
};
