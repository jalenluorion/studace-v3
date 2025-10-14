'use client';

import { Suspense, useState, useEffect } from 'react';
import { Tables } from '@/database.types';

import Background from './control/background';
import Audio from './control/audio';
import Interface from './spaceInterface';
import Image from 'next/image';
import Social, { SocialUser } from './control/social';

import { globalSettings } from '@/lib/supabase/globals';
import { ModuleType } from '@/modules/types';

export default function Space({
    spaceUser,
    spaceSettings,
    modules,
    spaceGlobals,
}: {
    spaceUser: Tables<'profile'> | null;
    spaceSettings: Tables<'space'>;
    modules: Promise<ModuleType[]>;
    spaceGlobals: globalSettings;
}) {
    const [audio, setAudio] = useState({id: '', on: false, ready: false});
    const [background, setbackground] = useState<string>(spaceSettings.background);
    const [activeUsers, setActiveUsers] = useState<SocialUser & { presence_ref: string }[]>([]);

    const [backgroundLoaded, setBackgroundLoaded] = useState(false);
    const [usersLoaded, setUsersLoaded] = useState(false);
    const [modulesLoaded, setModulesLoaded] = useState(false);

    const allLoaded = backgroundLoaded && usersLoaded && modulesLoaded;


    return (
        <div className="h-screen w-screen overflow-hidden relative">
            <div
                className={`absolute inset-0 z-50 transition-opacity duration-400 ${allLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
            >
                <Loading background={background} />
            </div>
            <div className={`transition-opacity duration-400 ${allLoaded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <Social setActiveUsers={setActiveUsers} setUsersLoaded={setUsersLoaded} spaceUser={spaceUser} spaceSettings={spaceSettings} />
                <Background backgroundId={background} setBackgroundLoaded={setBackgroundLoaded} live={false} />
                <Audio audio={audio} setAudio={setAudio} />
                <Interface
                    spaceUser={spaceUser}
                    spaceSettings={spaceSettings}
                    spaceGlobals={spaceGlobals}
                    activeUsers={activeUsers}
                    modules={modules}
                    audio={audio}
                    setAudio={setAudio}
                    background={background}
                    setBackground={setbackground}
                    setModulesLoaded={setModulesLoaded}
                />
            </div>
        </div>
    );
}

function Loading({ background }: { background: string }) {
    return (
        <div className='absolute z-25 h-full w-full overflow-hidden'>
            <div className="absolute z-30 flex h-full w-full items-center justify-center backdrop-blur-sm transition-opacity">
                <div className="animate-pulse text-xl text-white">Loading...</div>
            </div>
            <Image
                className="overflow-hidden absolute left-1/2 z-10 h-full w-auto max-w-none -translate-x-1/2 transform min-video-aspect:top-1/2 min-video-aspect:h-auto min-video-aspect:w-full min-video-aspect:-translate-y-1/2"
                src={`https://img.youtube.com/vi/${background}/maxresdefault.jpg`}
                width="0"
                height="0"
                sizes="100vw"
                alt="Video Thumbnail"
            />
            <div className="absolute inset-0 z-9 bg-black" />
        </div>
    );
}
