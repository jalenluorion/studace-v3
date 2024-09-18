import { Tables } from '@/database.types';
import { createClient } from './server';
import { allModules, AllSupabaseModules } from '@/config/default';

const getModuleData = (module: string, spaceId: string | null) => {
    const moduleData = allModules.find((mod) => mod.name === module);
    if (moduleData) {
        return fetch(moduleData, spaceId);
    }
    return null;
};
const createModuleData = (module: string, spaceId: string) => {
    const moduleData = allModules.find((mod) => mod.name === module);
    if (moduleData) {
        return create(moduleData, spaceId);
    }
    return null;
};

export function fetchModules(module: string[], spaceId: string | null) {
    const modulePromises = module.map((mod) => getModuleData(mod, spaceId));
    return Promise.all(modulePromises);
}
export function createModules(module: string[], spaceId: string) {
    const modulePromises = module.map((mod) => createModuleData(mod, spaceId));

    return Promise.all(modulePromises);
}

async function fetch(module: { name: string; default: unknown }, spaceId: string | null) {
    if (!spaceId) {
        return module.default;
    }

    const supabase = createClient();
    // FIXME: Unsafe typing
    if (allModules.map((mod) => mod.name).includes(module.name)) {
        const { data, error } = await supabase
            .from(module.name as AllSupabaseModules)
            .select()
            .eq('space_id', spaceId)
            .single();

        if (error) {
            throw error;
        }

        return data;
    }
    throw new Error('Module not found');
}
async function create(module: { name: string; default: unknown }, spaceId: string) {
    const supabase = createClient();
    // FIXME: Unsafe typing
    if (allModules.map((mod) => mod.name).includes(module.name)) {
        const spaceData = {
            ...(module.default as object),
            space_id: spaceId,
        };

        const { error } = await supabase
            .from(module.name as AllSupabaseModules)
            .insert(spaceData as Tables<AllSupabaseModules>);

        if (error) {
            throw error;
        }

        return spaceData;
    }
    throw new Error('Module not found');
}
