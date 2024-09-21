'use client';

import { use, useState } from 'react';
import Control from './control/control';
import SpaceModules from './spaceModules';
import SpaceSocial from './spaceSocial';
import { Tables } from '@/database.types';
import { User } from './control/social';

export default function Interface({
    spaceSettings,
    spaceStates,
    activeUsers,
    spaceData,
    setBackground,
}: {
    spaceSettings: Tables<'space'>;
    spaceStates: Promise<string[]>;
    activeUsers: User & {presence_ref: string}[];
    spaceData: Promise<unknown[]>;
    setBackground: (background: string) => void;
}) {
    const [volumnOn, setVolumeOn] = useState(false);
    const [micOn, setMicOn] = useState(false);
    const [cameraOn, setCameraOn] = useState(false);

    const [hidden, setHidden] = useState(false);

    const state = use(spaceStates);
    const res = use(spaceData);

    return (
        <div className="absolute flex h-full w-full flex-col overflow-hidden md:flex md:flex-col md:items-center lg:block">
            <div className="flex h-full w-full flex-col items-center overflow-scroll md:flex-row md:items-stretch lg:absolute lg:z-10 lg:flex-row lg:items-stretch">
                <div className="flex w-full items-center px-4 text-white sm:w-auto md:w-auto lg:w-auto">
                    <SpaceSocial activeUsers={activeUsers} hidden={hidden} />
                </div>

                <div className="flex-1 p-4"></div>

                <div className="flex w-full items-center px-4 text-white sm:w-auto md:w-auto lg:w-auto">
                    <SpaceModules modules={spaceSettings.modules} data={res} hidden={hidden} />
                </div>
            </div>
            <div className="w-full md:static md:w-auto md:pb-2 lg:absolute lg:bottom-0 lg:left-1/2 lg:z-20 lg:w-auto lg:-translate-x-1/2 lg:transform lg:pb-2">
                <Control
                    name={spaceSettings.name}
                    volumeOn={volumnOn}
                    setVolumeOn={setVolumeOn}
                    micOn={micOn}
                    setMicOn={setMicOn}
                    cameraOn={cameraOn}
                    setCameraOn={setCameraOn}
                    hidden={hidden}
                    setHidden={setHidden}
                    setBackground={setBackground}
                />
            </div>
        </div>
    );
}
