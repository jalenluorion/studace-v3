'use client';

import YouTube from 'react-youtube';

export default function Background({ videoId, live, resolve }: { videoId: string, live: boolean, resolve: (value: string) => void }) {
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
                videoId={videoId}
                opts={live ? videoOptsLive : videoOptsNorm}
                onPlay={async () => {
                    await resolve('done');
                }}
            />
        </div>
    );
}

