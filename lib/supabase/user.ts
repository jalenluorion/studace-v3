'use server';

import { createClient } from './server';
import { Database, Tables, Enums } from '@/database.types';
import { createSpace } from './space';
import { redirect } from 'next/navigation';
import { createClient as adminClient} from '@supabase/supabase-js';

export async function getAuthUser(redirectLink: string | null = '/login') {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        if (!redirectLink){
            throw new Error('User not found');
        } else {
            return redirect(redirectLink);
        }
    } else {
        try {
            await getProfile(user.id);
        } catch (error) {
            return redirect('/welcome');
        }

        return user;
    }
}

export async function isRegistered() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }
    
    try {
        await getProfile(user.id);
    } catch (error) {
        return
    }

    return redirect('/home');
}


export async function registerProfile(userFirst: string, userLast: string, username: string, birthday: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not found');
    }

    const userId = user.id;

    const { error } = await supabase.from('profile').insert([
        {
            user_id: userId,
            first_name: userFirst,
            last_name: userLast,
            username: username,
            birthday: birthday,
        },
    ]);

    if (error) {
        throw error;
    }

    const firstSpace = {
        owner_id: userId,
    };

    const spaceId = await createSpace(firstSpace);

    return spaceId;
}

export async function getProfile(userId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase.from('profile').select().eq('user_id', userId).single();

    if (error) {
        throw error;
    }

    return data;
}

export async function getSpaces(userId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase.from('space').select().eq('owner_id', userId);
    
    if (error) {
        throw error;
    }

    return data;
}

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect('/login');
}

export async function getEmail(username: string) {
    const admin = adminClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PRIVATE_SUPABASE_SERVICE_KEY!);

    const { data: profile } = await admin
        .from('profile')
        .select('user_id')
        .eq('username', username)
        .single();

    if (!profile?.user_id) {
        return undefined;
    }

    const { data } = await admin.auth.admin.getUserById(profile.user_id);

    return data.user!.email;
}
