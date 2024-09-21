'use client';

import { Suspense, useState } from 'react';
import { Tables } from '@/database.types';

import Background from './control/background';
import Interface from './spaceInterface';
import Image from 'next/image';
import Social, { User } from './control/social';

export default function Space({
    spaceSettings,
    spaceStates,
    spaceData,
}: {
    spaceSettings: Tables<'space'>;
    spaceStates: Promise<string[]>;
    spaceData: Promise<unknown[]>;
}) {
    const [background, setbackground] = useState<string>(spaceSettings.background);
    const [activeUsers, setActiveUsers] = useState<User & {presence_ref: string}[]>([]);

    return (
        <div className="h-screen w-screen overflow-hidden">
            <Social setActiveUsers={setActiveUsers} spaceSettings={spaceSettings} />
            <Background backgroundId={background} live={false} />
            <Suspense fallback={<Loading background={background} />}>
                <Interface
                    spaceSettings={spaceSettings}
                    activeUsers={activeUsers}
                    spaceStates={spaceStates}
                    spaceData={spaceData}
                    setBackground={setbackground}
                />
            </Suspense>
        </div>
    );
}

function Loading({ background }: { background: string }) {
    return (
        <div>
            <div className="absolute z-30 flex h-full w-full items-center justify-center backdrop-blur transition-opacity">
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
