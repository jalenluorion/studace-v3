import { createClient } from './server';
import { defaultSpace } from '@/config/default';
import { createModules } from './modules';
import { getProfile, getAuthUser } from './user';

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
    const supabase = await createClient();

    let defaultName = defaultSpace.name;
    if (!spaceInput.name) {
        const profile = await getProfile(spaceInput.owner_id);

        defaultName = profile.first_name + ' ' + profile.last_name + "'s Space";
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
    const supabase = await createClient();

    const { data, error } = await supabase.from('space').select().eq('space_id', spaceId).single();

    if (error) {
        throw error;
    }

    return data;
}

export async function getSpacesByUser(limit?: number) {
    const supabase = await createClient();

    const user = await getAuthUser(null)
        .catch(() => {
            return null;
        });

    const userId = user?.id || null;

    if (userId == null) {
        return [];
    }

    let query = supabase.from('space').select().eq('owner_id', userId);

    if (limit) {
        query = query.order('last_opened', { ascending: false }).limit(limit);
    }

    const { data, error } = await query;

    if (error) {
        throw error;
    }

    return data;
}
