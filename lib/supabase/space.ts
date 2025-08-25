"use server"

import { createClient } from './server';
import { defaultSpace } from '@/config/default';
import { createModules } from './modules';
import { getProfile, getAuthUser } from './user';
import { AllModules } from '@/modules/types';

interface SpaceInput {
    allowed_users?: string[];
    background?: string;
    is_public?: boolean;
    last_opened?: string;
    modules?: AllModules[];
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

// FUNCTIONS FOR EDITING
async function checkOwner(spaceId: string, userId: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('space')
        .select('owner_id')
        .eq('space_id', spaceId)
        .single();
    if (error) throw error;
    if (!data || data.owner_id !== userId) {
        throw new Error('Not authorized: user is not the owner');
    }
}

export async function updateSpaceName(spaceId: string, newName: string, userId: string) {
    await checkOwner(spaceId, userId);
    const supabase = await createClient();
    const { error } = await supabase
        .from('space')
        .update({ name: newName })
        .eq('space_id', spaceId);

    if (error) throw error;
}

export async function addAllowedUser(spaceId: string, userId: string, callerId: string) {
    await checkOwner(spaceId, callerId);
    const supabase = await createClient();

    let targetUserId: string | undefined = undefined;
    if (userId.includes('@')) {
        // Input is email, look up userId
        const { data: userProfile, error: userError } = await supabase
            .from('profile')
            .select('user_id')
            .eq('email', userId)
            .single();
        if (userError) throw userError;
        if (!userProfile || !userProfile.user_id) {
            throw new Error('No user found with that email');
        }
        targetUserId = userProfile.user_id;
    } else {
        // Input is username, look up userId
        console.log('Looking up user ID by username:', userId); // --- IGNORE ---
        const { data: userProfile, error: userError } = await supabase
            .from('profile')
            .select('user_id')
            .eq('username', userId)
            .single();
        if (userError) throw userError;
        if (!userProfile || !userProfile.user_id) {
            throw new Error('No user found with that username');
        }
        targetUserId = userProfile.user_id;
    }

    const { data, error: fetchError } = await supabase
        .from('space')
        .select('allowed_users')
        .eq('space_id', spaceId)
        .single();
    if (fetchError) throw fetchError;

    const allowed_users = data.allowed_users || [];
    if (targetUserId && !allowed_users.includes(targetUserId)) allowed_users.push(targetUserId);

    const { error } = await supabase
        .from('space')
        .update({ allowed_users })
        .eq('space_id', spaceId);
    if (error) throw error;
}

export async function removeAllowedUser(spaceId: string, userId: string, callerId: string) {
    await checkOwner(spaceId, callerId);
    const supabase = await createClient();
    const { data, error: fetchError } = await supabase
        .from('space')
        .select('allowed_users')
        .eq('space_id', spaceId)
        .single();
    if (fetchError) throw fetchError;
    let allowed_users = data.allowed_users || [];
    allowed_users = allowed_users.filter((id: string) => id !== userId);
    const { error } = await supabase
        .from('space')
        .update({ allowed_users })
        .eq('space_id', spaceId);
    if (error) throw error;
}

export async function changeVisibility(spaceId: string, isPublic: boolean, userId: string) {
    await checkOwner(spaceId, userId);
    const supabase = await createClient();
    const { error } = await supabase
        .from('space')
        .update({ is_public: isPublic })
        .eq('space_id', spaceId);
    if (error) throw error;
}

export async function updateSpaceModules(spaceId: string, modules: AllModules[], userId: string) {
    await checkOwner(spaceId, userId);
    const supabase = await createClient();
    const { error } = await supabase
        .from('space')
        .update({ modules })
        .eq('space_id', spaceId);

    if (error) throw error;
}

export async function deleteSpace(spaceId: string, userId: string) {
    await checkOwner(spaceId, userId);
    const supabase = await createClient();
    const { error } = await supabase.from('space').delete().eq('space_id', spaceId);
    if (error) throw error;
}