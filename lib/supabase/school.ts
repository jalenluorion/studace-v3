import { createClient } from './server';
import { Database, Tables, Enums } from '@/database.types';
import { createSpace } from './space';

export async function getSchools(userId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase.from('school').select().contains('users', [userId]);

    if (error) {
        throw new Error(`Error fetching schools: ${error.message}`);
    }
    
    return data;
}

export async function getSchool(schoolId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase.from('school').select().eq('school_id', schoolId).single();

    if (error) {
        throw new Error(`Error fetching school: ${error.message}`);
    }

    return data;
}