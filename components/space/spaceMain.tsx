'use client'

import { Suspense, useState } from 'react';

import Background from './spaceBackground';
import Interface from './spaceInterface';

export default function Space({
    initialData,
    spaceData,
}: {
    initialData: {
        backgroundId: string
    }
    spaceData: {
        module: string
        data: Promise<any>
    }[]
}) {
    const [backgroundId, setbackgroundId] = useState<string>(initialData.backgroundId);

    return (
        <div className='w-screen h-screen'>
            <Background backgroundId={backgroundId} live={false} />
            <Suspense fallback={<Loading />}>
                <Interface promise={spaceData} />
            </Suspense>
        </div>
    );
}

function Loading() {
    return (
        <div className='absolute h-full w-full z-30 flex justify-center items-center backdrop-blur transition-opacity'>
            <div className='text-white text-xl animate-pulse'>Loading...</div>
        </div>
    )
}