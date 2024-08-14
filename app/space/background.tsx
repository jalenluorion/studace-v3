'use client';

import YouTube from 'react-youtube';
import { useState } from 'react';

export default function Background({ videoId, resolve }: { videoId: string, resolve: (value: string) => void }) {
    const [playing, setPlaying] = useState(false);

    const videoOpts = {
        playerVars: {
            autoplay: 1,
            controls: 0,
            loop: 1,
            mute: 1,
            playsinline: 1,
            start: 60,
        },
    };

    return (
        <div>
            <YouTube
                videoId={videoId}
                opts={videoOpts}
                onPlay={async () => {
                    setPlaying(true);
                    await resolve('done');
                }}
            />
            {!playing && (
                <img
                    className='video-thumbnail'
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    alt='Video Thumbnail'
                />
            )}
        </div>
    );
}

