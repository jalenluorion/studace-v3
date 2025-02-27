'use server'

import { createClient } from '../server';
import { Database, Tables, Enums } from '@/database.types';

export async function updateTimer(timer: Tables<'timer'>) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return;
    }

    const { error } = await supabase
        .from('timer')
        .upsert([{ ...timer }])
        .eq('space_id', timer.space_id);

    if (error) {
        throw error;
    }

    return;
}
