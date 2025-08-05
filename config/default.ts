import { Tables } from '@/database.types';

import { defaultModuleKeys } from './modules';

// Use keys for the default space
export const defaultSpace: Tables<'space'> = {
    allowed_users: [],
    background: 'c0_ejQQcrwI',
    is_public: false,
    last_opened: null,
    modules: defaultModuleKeys,
    name: 'Studace Space',
    owner_id: '',
    school: null,
    space_id: '',
};