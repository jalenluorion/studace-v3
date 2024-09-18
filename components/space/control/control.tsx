'use client';

import {
    Card,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from '@/components/ui/popover';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import {
    House,
    LayoutGrid,
    Volume2,
    VolumeX,
    ListMusic,
    ImageIcon,
    Mic,
    MicOff,
    Video,
    VideoOff,
    ScreenShare,
    ScreenShareOff,
    Settings,
    ChevronDown,
    ChevronUp,
    Maximize2,
    Minimize2,
} from 'lucide-react';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function Control({
    name,
    volumeOn,
    setVolumeOn,
    micOn,
    setMicOn,
    cameraOn,
    setCameraOn,
    hidden,
    setHidden,
    setBackground,
}: {
    name: string;
    volumeOn: boolean;
    setVolumeOn: (volumeOn: boolean) => void;
    micOn: boolean;
    setMicOn: (micOn: boolean) => void;
    cameraOn: boolean;
    setCameraOn: (cameraOn: boolean) => void;
    hidden: boolean;
    setHidden: (hidden: boolean) => void;
    setBackground: (background: string) => void;
}) {
    const router = useRouter();

    const [spacePopup, setSpacePopup] = useState(false);
    const [musicPopup, setMusicPopup] = useState(false);

    const [fullScreen, setFullScreen] = useState(false);

    function editFullScreen() {
        if (fullScreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
        setFullScreen(!fullScreen);
    }

    const controlRef = useRef(null);

    return (
        <div className="">
            <Card
                className="flex flex-col items-center rounded-b-none md:rounded-b-lg lg:rounded-b-lg"
                ref={controlRef}
            >
                <div className={`flex items-center [&>*]:mt-2 ${hidden ? 'mb-2' : ''}`}>
                    <Button
                        variant="ghost"
                        className="mx-2 h-6 w-6 p-0"
                        onClick={() => setHidden(!hidden)}
                    >
                        {hidden ? <ChevronUp size="20" /> : <ChevronDown size="20" />}
                    </Button>
                    <CardTitle>{name}</CardTitle>
                    <Button variant="ghost" className="mx-2 h-6 w-6 p-0" onClick={editFullScreen}>
                        {fullScreen ? <Minimize2 size="20" /> : <Maximize2 size="20" />}
                    </Button>
                </div>
                <div
                    className={`flex items-center overflow-hidden transition-[max-height,opacity] ease-in duration-250 [&>*]:m-1 ${hidden ? 'max-h-0 opacity-0' : 'opacity-100 md:max-h-12 lg:max-h-12'} flex-wrap md:flex-nowrap lg:flex-nowrap`}
                >
                    <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
                        <House className="" />
                    </Button>
                    <Popover open={spacePopup}>
                        <PopoverTrigger>
                            <Toggle
                                pressed={spacePopup}
                                onPressedChange={() => {
                                    setSpacePopup(!spacePopup);
                                    setMusicPopup(false);
                                }}
                                size="icon"
                            >
                                <LayoutGrid className="" />
                            </Toggle>
                        </PopoverTrigger>
                        <PopoverAnchor virtualRef={controlRef}></PopoverAnchor>
                        <PopoverContent>pick a new space</PopoverContent>
                    </Popover>
                    <Separator orientation="vertical" className="h-6" />
                    <Button variant="ghost" size="icon" onClick={() => setVolumeOn(!volumeOn)}>
                        {volumeOn ? <Volume2 /> : <VolumeX className="text-destructive" />}
                    </Button>
                    <Popover open={musicPopup}>
                        <PopoverTrigger>
                            <Toggle
                                pressed={musicPopup}
                                onPressedChange={() => {
                                    setMusicPopup(!musicPopup);
                                    setSpacePopup(false);
                                }}
                                size="icon"
                            >
                                <ListMusic className="" />
                            </Toggle>
                        </PopoverTrigger>
                        <PopoverAnchor virtualRef={controlRef}></PopoverAnchor>
                        <PopoverContent>pick music</PopoverContent>
                    </Popover>
                    <Dialog>
                        <DialogTrigger>
                            <Button variant="ghost" size="icon">
                                <ImageIcon />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            select space image
                            <Button
                                variant="destructive"
                                onClick={() => setBackground('xg1gNlxto2M')}
                            >
                                change
                            </Button>
                        </DialogContent>
                    </Dialog>
                    <Separator orientation="vertical" className="h-6" />
                    <Button variant="ghost" size="icon" onClick={() => setMicOn(!micOn)}>
                        {micOn ? <Mic /> : <MicOff className="text-destructive" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setCameraOn(!cameraOn)}>
                        {cameraOn ? <Video /> : <VideoOff className="text-destructive" />}
                    </Button>
                    <Dialog>
                        <DialogTrigger>
                            <Button variant="ghost" size="icon">
                                <ScreenShare />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>share screen</DialogContent>
                    </Dialog>
                    <Separator orientation="vertical" className="h-6" />
                    <Dialog>
                        <DialogTrigger>
                            <Button variant="ghost" size="icon">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="" />
                                    <AvatarFallback>JL</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>user info</DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger>
                            <Button variant="ghost" size="icon">
                                <Settings />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>settings</DialogContent>
                    </Dialog>
                </div>
            </Card>
        </div>
    );
}
