'use client';

import { use, useState } from 'react';
import Control from './control/control';
import SpaceModules from './spaceModules';
import SpaceSocial from './spaceSocial';
import { Tables } from '@/database.types';
import { SocialUser } from './control/social';

export default function Interface({
    spaceSettings,
    spaceStates,
    activeUsers,
    spaceData,
    setBackground,
}: {
    spaceSettings: Tables<'space'>;
    spaceStates: Promise<string[]>;
    activeUsers: SocialUser & { presence_ref: string }[];
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
        <div className="absolute flex h-full w-full flex-col overflow-hidden modmd:flex modmd:flex-col modmd:items-center modlg:block">
            <div className="flex h-full w-full flex-col items-center overflow-scroll modmd:flex-row modmd:items-stretch modlg:absolute modlg:z-10 modlg:flex-row modlg:items-stretch">
                <div className="flex w-full items-center px-4 text-white modsm:w-auto modmd:w-auto modlg:w-auto">
                    <SpaceSocial activeUsers={activeUsers} hidden={hidden} />
                </div>

                <div className="flex-1 p-4"></div>

                <div className="flex w-full items-center px-4 text-white modsm:w-auto modmd:w-auto modlg:w-auto">
                    <SpaceModules modules={spaceSettings.modules} data={res} hidden={hidden} />
                </div>
            </div>
            <div className="w-full modmd:static modmd:w-auto modmd:pb-2 modlg:absolute modlg:bottom-0 modlg:left-1/2 modlg:z-20 modlg:w-auto modlg:-translate-x-1/2 modlg:transform modlg:pb-2">
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
