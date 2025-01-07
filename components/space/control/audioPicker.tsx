import { Toggle } from '@/components/ui/toggle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mediaOptions, audio } from '@/config/media';
import { Loader2, Volume2, VolumeX } from 'lucide-react';

export default function AudioPicker({
    audio,
    setAudio,
}: {
    audio: { id: string; on: boolean; ready: boolean };
    setAudio: (audio: { id: string; on: boolean; ready: boolean }) => void;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Audio</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    {mediaOptions.audio.map((audioOption) => (
                        <Toggle
                            pressed={audio.id === audioOption.value && audio.on}
                            key={audioOption.value}
                            className={`flex items-center gap-2 rounded-md border-2 px-4 py-2`}
                            onClick={() => setAudio({ id: audioOption.value, on: audio.id === audioOption.value ? !audio.on : true, ready: false })}
                        >
                            {audio.id === audioOption.value && audio.on && !audio.ready ? (
                                <Loader2 className="h-5 w-5 animate-spin text-white" />
                            ) : (
                                <>
                                    {audio.id === audioOption.value && audio.on ? (
                                        <Volume2 className="h-5 w-5" />
                                    ) : (
                                        <VolumeX className="h-5 w-5" />
                                    )}
                                </>
                            )}
                            <span>{audioOption.label}</span>
                        </Toggle>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
