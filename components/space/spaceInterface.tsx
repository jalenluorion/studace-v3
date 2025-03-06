'use client';

import { use, useState } from 'react';
import Control from './control/control';
import SpaceModules from './spaceModules';
import SpaceSocial from './spaceSocial';
import { Tables } from '@/database.types';
import { SocialUser } from './control/social';
import { globalSettings } from '@/lib/supabase/globals';

export default function Interface({
    spaceUser,
    spaceSettings,
    spaceStates,
    spaceGlobals,
    activeUsers,
    spaceData,
    audio,
    setAudio,
    background,
    setBackground,
}: {
    spaceUser: Tables<'profile'> | null;
    spaceSettings: Tables<'space'>;
    spaceStates: Promise<string[]>;
    spaceGlobals: globalSettings;
    activeUsers: SocialUser & { presence_ref: string }[];
    spaceData: Promise<unknown[]>;
    audio: { id: string; on: boolean, ready: boolean };
    setAudio: (audio: { id: string; on: boolean, ready: boolean }) => void;
    background: string;
    setBackground: (background: string) => void;
}) {
    const [micOn, setMicOn] = useState(false);
    const [cameraOn, setCameraOn] = useState(false);

    const [hidden, setHidden] = useState(false);

    const state = use(spaceStates);
    const res = use(spaceData);

    return (
        <div className="absolute flex h-full w-full flex-col overflow-hidden modmd:flex modmd:flex-col modmd:items-center modlg:block">
            <div className="flex h-full w-full flex-col items-center  modmd:flex-row modmd:items-stretch modlg:absolute modlg:z-10 modlg:flex-row modlg:items-stretch">
                <div className="flex w-full items-center px-4 text-white modsm:w-auto modmd:w-auto modlg:w-auto">
                    <SpaceSocial activeUsers={activeUsers} hidden={hidden} />
                </div>

                <div className="flex-1 p-4"></div>

                <div className="flex w-full items-center px-4 text-white modsm:w-auto modmd:w-auto modlg:w-auto">
                    <SpaceModules modules={spaceSettings.modules} data={res} hidden={hidden} />
                </div>
            </div>
            <div className="w-full modmd:static modmd:w-auto modmd:pb-2 modlg:absolute modlg:bottom-0 modlg:left-1/2 modlg:z-20 modlg:w-auto modlg:-translate-x-1/2 modlg:pb-2">
                <Control
                    user={spaceUser}
                    name={spaceSettings.name}
                    volumeOn={audio}
                    setVolumeOn={setAudio}
                    micOn={micOn}
                    setMicOn={setMicOn}
                    cameraOn={cameraOn}
                    setCameraOn={setCameraOn}
                    hidden={hidden}
                    setHidden={setHidden}
                    background={background}
                    setBackground={setBackground}
                    globalSettings={spaceGlobals}
                />
            </div>
        </div>
    );
}
