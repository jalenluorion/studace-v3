'use client';

import { Suspense, useState } from 'react';
import { Tables } from '@/database.types';

import Background from './control/background';
import Audio from './control/audio';
import Interface from './spaceInterface';
import Image from 'next/image';
import Social, { SocialUser } from './control/social';

export default function Space({
    spaceUser,
    spaceSettings,
    spaceStates,
    spaceData,
}: {
    spaceUser: Tables<'profile'> | null;
    spaceSettings: Tables<'space'>;
    spaceStates: Promise<string[]>;
    spaceData: Promise<unknown[]>;
}) {
    const [background, setbackground] = useState<string>(spaceSettings.background);
    const [audio, setAudio] = useState({id: '', on: false, ready: false});
    const [activeUsers, setActiveUsers] = useState<SocialUser & { presence_ref: string }[]>([]);

    return (
        <div className="h-screen w-screen overflow-hidden">
            <Social setActiveUsers={setActiveUsers} spaceUser={spaceUser} spaceSettings={spaceSettings} />
            <Background backgroundId={background} live={false} />
            <Audio audio={audio} setAudio={setAudio} />
            <Suspense fallback={<Loading background={background} />}>
                <Interface
                    spaceUser={spaceUser}
                    spaceSettings={spaceSettings}
                    activeUsers={activeUsers}
                    spaceStates={spaceStates}
                    spaceData={spaceData}
                    audio={audio}
                    setAudio={setAudio}
                    background={background}
                    setBackground={setbackground}
                />
            </Suspense>
        </div>
    );
}

function Loading({ background }: { background: string }) {
    return (
        <div>
            <div className="absolute z-30 flex h-full w-full items-center justify-center backdrop-blur-sm transition-opacity">
                <div className="animate-pulse text-xl text-white">Loading...</div>
            </div>
            <Image
                className="absolute left-1/2 z-10 h-full w-auto max-w-none -translate-x-1/2 transform min-video-aspect:top-1/2 min-video-aspect:h-auto min-video-aspect:w-full min-video-aspect:-translate-y-1/2"
                src={`https://img.youtube.com/vi/${background}/maxresdefault.jpg`}
                width="0"
                height="0"
                sizes="100vw"
                alt="Video Thumbnail"
            />
        </div>
    );
}
