'use client';

import YouTube from 'react-youtube';
import { useState, useEffect } from 'react';
import Image from 'next/image';

//TODO: replace with https://next-video.dev/
export default function Background({
    backgroundId,
    setBackgroundLoaded,
    live,
}: {
    backgroundId: string;
    setBackgroundLoaded: (loaded: boolean) => void;
    live: boolean;
}) {
    const [bgLoaded, isBgLoaded] = useState(false);

    useEffect(() => {
        isBgLoaded(false);
    }, [backgroundId]);

    const videoOptsNorm = {
        playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            loop: 1,
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
        <div className="absolute z-0 h-full w-full overflow-hidden [&>iframe]:absolute select-none">
            <YouTube
                className="[&>iframe]:absolute [&>iframe]:left-1/2 [&>iframe]:top-1/2 [&>iframe]:h-[300%] [&>iframe]:w-full [&>iframe]:-translate-x-1/2 [&>iframe]:-translate-y-1/2 [&>iframe]:transform min-video-aspect:[&>iframe]:h-[300%] max-video-aspect:[&>iframe]:w-[177.78vh]"
                videoId={backgroundId}
                opts={live ? videoOptsLive : videoOptsNorm}
                onPlay={() => {
                    setBackgroundLoaded(true);
                    isBgLoaded(true);
                }}
            />
            {!bgLoaded && (
                <Image
                    className="overflow-hidden absolute left-1/2 z-10 h-full w-auto max-w-none -translate-x-1/2 transform min-video-aspect:top-1/2 min-video-aspect:h-auto min-video-aspect:w-full min-video-aspect:-translate-y-1/2"
                    src={`https://img.youtube.com/vi/${backgroundId}/maxresdefault.jpg`}
                    width="0"
                    height="0"
                    sizes="100vw"
                    alt="Video Thumbnail"
                />
            )}
        </div>
    );
}
