'use server'

import { RealtimeChannel } from '@supabase/supabase-js';
import { createClient } from './server';

export async function registerPresence(status: "SUBSCRIBED" | "TIMED_OUT" | "CLOSED" | "CHANNEL_ERROR", room: RealtimeChannel) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not logged in');
    }

    const { data, error } = await supabase.from('profile').select().eq('user_id', user.id).single();

    if (error) {
        throw error;
    }

    if (!data) {
        throw new Error('User not found');
    }

    const userStatus = {
        user: data.username,
        online_at: new Date().toISOString(),
    };

    if (status !== 'SUBSCRIBED') {
        return;
    }

    const presenceTrackStatus = await room.track(userStatus);

    return presenceTrackStatus;
}