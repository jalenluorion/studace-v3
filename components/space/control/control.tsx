'use client';

import { Card, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from '@/components/ui/popover';
import {
    Dialog,
    DialogContent,
    DialogContentChild,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import Link from 'next/link';

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

import { useRef, useState } from 'react';
import { Tables } from '@/database.types';
import { LoginForm } from '@/components/auth/login-form';

export default function Control({
    user,
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
    user: Tables<'profile'> | null;
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
                className="flex flex-col items-center rounded-b-none modmd:rounded-b-lg modlg:rounded-b-lg"
                ref={controlRef}
            >
                <div className={`flex items-center [&>*]:mt-2 ${hidden ? 'mb-2' : ''}`}>
                    <Button
                        variant="ghost"
                        className="mx-2 h-auto w-auto p-1"
                        onClick={() => setHidden(!hidden)}
                    >
                        {hidden ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                    <CardTitle>{name}</CardTitle>
                    <Button
                        variant="ghost"
                        className="mx-2 h-auto w-auto p-1"
                        onClick={editFullScreen}
                    >
                        {fullScreen ? <Minimize2 /> : <Maximize2 />}
                    </Button>
                </div>
                <div
                    className={`duration-250 flex items-center overflow-hidden transition-[max-height,opacity] ease-in [&>*]:m-1 [&_svg]:size-6 ${hidden ? 'max-h-0 opacity-0' : 'opacity-100 modmd:max-h-12 modlg:max-h-12'} flex-wrap modmd:flex-nowrap modlg:flex-nowrap`}
                >
                    <Link href="/home">
                        <Button variant="ghost" size="icon">
                            <House className="" />
                        </Button>
                    </Link>
                    <Popover open={spacePopup}>
                        <PopoverTrigger asChild>
                            <Toggle
                                pressed={spacePopup}
                                onPressedChange={() => {
                                    setSpacePopup(!spacePopup);
                                    setMusicPopup(false);
                                }}
                                size="icon"
                                className={
                                    spacePopup
                                        ? 'bg-accent text-accent-foreground hover:text-accent-foreground'
                                        : ''
                                }
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
                        <PopoverTrigger asChild>
                            <Toggle
                                pressed={musicPopup}
                                onPressedChange={() => {
                                    setMusicPopup(!musicPopup);
                                    setSpacePopup(false);
                                }}
                                size="icon"
                                className={
                                    musicPopup
                                        ? 'bg-accent text-accent-foreground hover:text-accent-foreground'
                                        : ''
                                }
                            >
                                <ListMusic className="" />
                            </Toggle>
                        </PopoverTrigger>
                        <PopoverAnchor virtualRef={controlRef}></PopoverAnchor>
                        <PopoverContent>pick music</PopoverContent>
                    </Popover>
                    <Dialog>
                        <DialogTrigger asChild>
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
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <ScreenShare />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>share screen</DialogContent>
                    </Dialog>
                    <Separator orientation="vertical" className="h-6" />
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="" />
                                    <AvatarFallback>JL</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DialogTrigger>
                        <DialogContentChild>
                            {user ? (
                                'hi'
                            ) : (
                                <LoginForm
                                    searchParams={
                                        {} as
                                            | { success: string }
                                            | { error: string }
                                            | { message: string }
                                    }
                                ></LoginForm>
                            )}
                        </DialogContentChild>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger asChild>
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
