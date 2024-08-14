import { Suspense } from 'react';

import Background from './spaceBackground';
import { fetchBgLoading, setBgLoaded } from './spaceBgHelper';

import Interface from './spaceInterface';
import Loading from './spaceLoader';

export default function SpaceGuest() {
    const customPromise = fetchBgLoading();

    return(
        <div className='w-screen h-screen'>
            <Background videoId='xg1gNlxto2M' live={false} resolve={setBgLoaded}/>
            <Suspense fallback={<Loading />}>
                <Interface promise={customPromise} />
            </Suspense>
        </div>
    )
}