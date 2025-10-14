import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Tables } from '@/database.types';
import { getProfile } from '@/lib/supabase/user';

export interface SocialUser {
    user_id?: string;
    username?: string;
    initials?: string;
    profile_picture?: string;
    online_at?: string;
}

export default function Social({
    setActiveUsers,
    setUsersLoaded,
    spaceUser,
    spaceSettings,
}: {
    setActiveUsers: (users: SocialUser & { presence_ref: string }[]) => void;
    setUsersLoaded: (loaded: boolean) => void;
    spaceUser: Tables<'profile'> | null;
    spaceSettings: Tables<'space'>;
}) {
    useEffect(() => {
        console.log('Setting up social presence...');
        const supabase = createClient();
        if (spaceSettings.space_id === '') {
            setUsersLoaded(true);
            return;
        }

        const roomOne = supabase.channel(spaceSettings.space_id);
        roomOne
            .on('presence', { event: 'sync' }, () => {
                const newState = roomOne.presenceState();

                const userKeys = Object.keys(newState);
                const users = userKeys.map((key) => newState[key][0]);

                setActiveUsers(users);
                console.log('sync', users);
            })
            .on('presence', { event: 'join' }, ({ key, newPresences }) => {
                console.log('join', key, newPresences);
            })
            .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
                console.log('leave', key, leftPresences);
            })
            .subscribe(async (status) => {
                if (!spaceUser) {
                    throw new Error('User not logged in');
                }
                
                const profile = await getProfile(spaceUser.user_id);

                if (!profile) {
                    throw new Error('User not found');
                }

                const userStatus: SocialUser = {
                    user_id: spaceUser.user_id,
                    username: profile.username,
                    initials: profile.first_name[0] + profile.last_name[0],
                    profile_picture:
                        'https://images-ext-1.discordapp.net/external/qEyJLr9rVQ1ibxV2X8ZHxiZMOdv7q8FAvQesPeVvN_o/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/640921495245422632/d925f7cc2cbc90f23ef66749789801bf.png?format=webp&quality=lossless&width=500&height=500',
                    online_at: new Date().toISOString(),
                };

                if (status !== 'SUBSCRIBED') {
                    return;
                }
                console.log('Connected to presence channel!');
                
                roomOne.track(userStatus);
                setUsersLoaded(true);
            });
    }, []);

    return null;
}
