import { Tables } from '@/database.types';
import { createClient } from './server';
import { allModules } from '@/modules';
import type { AllModules, ModuleType } from '@/modules/types';

export async function fetchModules(modules: AllModules[], spaceId: string | null) {
    return Promise.all(
        modules.map(async (mod) => {
            const moduleObj = allModules[mod] as ModuleType;
            const data = await fetch(moduleObj, spaceId);
            moduleObj.data = data as Tables<AllModules>;
            return moduleObj;
        })
    );
}

export async function createModules(modules: AllModules[], spaceId: string) {
    return Promise.all(
        modules.map(async (mod) => {
            const moduleObj = allModules[mod] as ModuleType;
            const data = await create(moduleObj, spaceId);
            moduleObj.data = data as Tables<AllModules>;
            return moduleObj;
        })
    );
}

async function fetch(module: ModuleType, spaceId: string | null) {
    if (!spaceId) return module.data;

    const supabase = await createClient();
    const { data, error } = await supabase
        .from(module.name as AllModules)
        .select()
        .eq('space_id', spaceId)
        .single();

    if (error) throw error;
    return data;
}

async function create(module: ModuleType, spaceId: string) {
    const supabase = await createClient();
    const spaceData = {
        ...(module.data as object),
        space_id: spaceId,
    };

    console.log('Creating module data for', module.name, spaceData);
    const { data, error } = await supabase
        .from(module.name as AllModules)
        .insert(spaceData as Tables<AllModules>);
    console.log('Insert response:', data);
    if (error) throw error;

    return spaceData;
}