'use client';

import YouTube from 'react-youtube';

export default function Audio({
    audio,
    setAudio,
}: {
    audio: { id: string; on: boolean, ready: boolean };
    setAudio: (audio: { id: string; on: boolean, ready: boolean }) => void;
}) {
    return (
        <div>
            {audio.on && (
                <YouTube
                    className='hidden'
                    videoId={audio.id}
                    opts={{
                        playerVars: {
                        autoplay: 1,
                        controls: 0,
                        mute: 0,
                        },
                    }}
                    onPlay={() => {
                        setAudio({ ...audio, ready: true });
                    }}
                />
            )}
        </div>
    );
}
