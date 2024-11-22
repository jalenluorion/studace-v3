'use server'

import { RealtimeChannel } from '@supabase/supabase-js';
import { createClient } from './server';
import { getProfile } from './user';

export async function registerPresence(status: "SUBSCRIBED" | "TIMED_OUT" | "CLOSED" | "CHANNEL_ERROR", room: RealtimeChannel) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not logged in');
    }

    const profile = await getProfile(user.id);

    if (!profile) {
        throw new Error('User not found');
    }

    const userStatus = {
        user: profile.username,
        online_at: new Date().toISOString(),
    };

    if (status !== 'SUBSCRIBED') {
        return;
    }

    const presenceTrackStatus = await room.track(userStatus);

    return presenceTrackStatus;
}