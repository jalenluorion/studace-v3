'use server'

import { createClient } from '@/lib/supabase/server';
import { Database, Tables, Enums } from '@/database.types';

export async function updateTasks(tasklist: Tables<'tasklist'>) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return;
    }

    const { error } = await supabase
        .from('tasklist')
        .upsert([{ ...tasklist }])
        .eq('space_id', tasklist.space_id);

    if (error) {
        throw error;
    }

    return;
}

export async function updateTags(spaceId: string, tags: Database['public']['CompositeTypes']['tag'][]) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return;
    }

    const { error } = await supabase
        .from('tasklist')
        .upsert([{ space_id: spaceId, tags }])
        .eq('space_id', spaceId);

    if (error) {
        throw error;
    }

    return;
}