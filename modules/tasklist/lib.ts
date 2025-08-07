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
