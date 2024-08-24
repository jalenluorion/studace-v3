'use client';

import YouTube from 'react-youtube';
import { setBgLoaded } from '@/lib/spaceBgHelper';
import { useState } from 'react';
import Image from 'next/image';

export default function Background({
    backgroundId,
    live,
}: {
    backgroundId: string;
    live: boolean;
}) {
    const [bgLoaded, isBgLoaded] = useState(false);

    const videoOptsNorm = {
        playerVars: {
            autoplay: 1,
            controls: 0,
            loop: 1,
            mute: 1,
            playsinline: 1,
            start: 60,
        },
    };
    const videoOptsLive = {
        playerVars: {
            autoplay: 1,
            controls: 0,
            mute: 1,
            playsinline: 1,
        },
    };

    return (
        <div className='w-full h-full absolute z-0 overflow-hidden [&>iframe]:absolute'>
            <YouTube
                className='[&>iframe]:absolute [&>iframe]:top-1/2 [&>iframe]:left-1/2 [&>iframe]:transform [&>iframe]:-translate-x-1/2 [&>iframe]:-translate-y-1/2 [&>iframe]:w-full [&>iframe]:h-[300%] max-video-aspect:[&>iframe]:w-[177.78vh] min-video-aspect:[&>iframe]:h-[300%]'
                videoId={backgroundId}
                opts={live ? videoOptsLive : videoOptsNorm}
                onPlay={() => {
                    setBgLoaded('done');
                    isBgLoaded(true);
                }}
            />
            {!bgLoaded && (
                <Image
                    className='h-full max-w-none w-auto absolute z-10 left-1/2 transform -translate-x-1/2 min-video-aspect:w-full min-video-aspect:h-auto min-video-aspect:top-1/2 min-video-aspect:-translate-y-1/2'
                    src={`https://img.youtube.com/vi/${backgroundId}/maxresdefault.jpg`}
                    width="0"
                    height="0"
                    sizes="100vw"
                    alt='Video Thumbnail'
                />
            )}
        </div>
    );
}
