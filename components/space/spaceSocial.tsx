import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { CSSTransition } from 'react-transition-group';
import { CarouselModule } from './control/modules';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { Tables } from '@/database.types';
import { CarouselCard, CarouselAddCard } from './control/userCard';

export interface User {
    user_id?: string;
    username?: string;
    initials?: string;
    profile_picture?: string;
    online_at?: string;
}

export default function SpaceSocial({
    spaceSettings,
    hidden,
}: {
    spaceSettings: Tables<'space'>;
    hidden: boolean;
}) {
    const [activeUsers, setActiveUsers] = useState<User & {presence_ref: string}[]>([]);

    useEffect(() => {
        const supabase = createClient();
        if (spaceSettings.space_id === '') {
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
            
                const userStatus : User = {
                    user_id: user.id,
                    username: data.username,
                    initials: data.first_name[0] + data.last_name[0],
                    profile_picture: 'https://images-ext-1.discordapp.net/external/qEyJLr9rVQ1ibxV2X8ZHxiZMOdv7q8FAvQesPeVvN_o/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/640921495245422632/d925f7cc2cbc90f23ef66749789801bf.png?format=webp&quality=lossless&width=500&height=500',
                    online_at: new Date().toISOString(),
                };
            
                if (status !== 'SUBSCRIBED') {
                    return;
                }
            
                roomOne.track(userStatus);
            });
    }, []);

    return (
        <CSSTransition
            in={!hidden}
            timeout={250}
            classNames="left"
            unmountOnExit
        >
            <div className="flex h-[38rem] w-full items-center @container sm:w-48 md:h-full md:w-48 lg:h-full lg:w-48">
                <Carousel
                    opts={{
                        align: 'start',
                        watchDrag: false,
                    }}
                    orientation="vertical"
                    className="w-full"
                >
                    <CarouselContent className="mt-0 h-[16rem] @[38rem]:h-[32rem] @[54rem]:h-[48rem]">
                        {activeUsers.map((user, index) => (
                            <CarouselCard key={index} user={user} />
                        ))}
                        <CarouselAddCard />
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </CSSTransition>
    );
}
