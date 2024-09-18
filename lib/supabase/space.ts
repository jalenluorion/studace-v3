import { createClient } from './server';
import { defaultSpace } from '@/config/default';
import { createModules } from './modules';

interface SpaceInput {
    allowed_users?: string[];
    background?: string;
    is_public?: boolean;
    last_opened?: string;
    modules?: string[];
    name?: string;
    owner_id: string;
    school?: string;
}

export async function createSpace(spaceInput: SpaceInput) {
    const supabase = createClient();

    let defaultName = defaultSpace.name;
    if (!spaceInput.name) {
        const { data, error } = await supabase
            .from('profile')
            .select()
            .eq('user_id', spaceInput.owner_id)
            .single();

        if (error) {
            throw error;
        }

        defaultName = data.first_name + ' ' + data.last_name + "'s Space";
    }

    const updatedInput = {
        allowed_users: spaceInput.allowed_users || defaultSpace.allowed_users,
        background: spaceInput.background || defaultSpace.background,
        is_public: spaceInput.is_public || defaultSpace.is_public,
        last_opened: spaceInput.last_opened || defaultSpace.last_opened,
        modules: spaceInput.modules || defaultSpace.modules,
        name: spaceInput.name || defaultName,
        owner_id: spaceInput.owner_id,
        school: spaceInput.school || defaultSpace.school,
    };

    const { data, error } = await supabase.from('space').insert(updatedInput).select().single();

    if (error) {
        throw error;
    }

    await createModules(data.modules, data.space_id);

    return data.space_id;
}

export async function getSpace(spaceId: string) {
    const supabase = createClient();

    const { data, error } = await supabase.from('space').select().eq('space_id', spaceId).single();

    if (error) {
        throw error;
    }

    return data;
}

export async function getSpacesByUser(userId: string) {
    const supabase = createClient();

    const { data, error } = await supabase.from('space').select().eq('owner_id', userId);

    if (error) {
        throw error;
    }

    return data;
}