'use client';

import { Card, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverAnchor,
    PopoverContentChild,
} from '@/components/ui/popover';
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
import BackgroundPicker from './backgroundPicker';
import AudioPicker from './audioPicker';
import SpaceSwitcher from './switcher';

import { globalSettings } from '@/lib/supabase/globals';

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
    background,
    setBackground,
    globalSettings,
}: {
    user: Tables<'profile'> | null;
    name: string;
    volumeOn: { id: string; on: boolean; ready: boolean };
    setVolumeOn: (volumeOn: { id: string; on: boolean; ready: boolean }) => void;
    micOn: boolean;
    setMicOn: (micOn: boolean) => void;
    cameraOn: boolean;
    setCameraOn: (cameraOn: boolean) => void;
    hidden: boolean;
    setHidden: (hidden: boolean) => void;
    background: string;
    setBackground: (background: string) => void;
    globalSettings: globalSettings;
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

    const controlRef = useRef<HTMLDivElement>(null);

    return (
        <div>
            <Card
                className="modmd:rounded-b-lg modlg:rounded-b-lg flex flex-col items-center rounded-b-none"
                ref={controlRef}
            >
                <div className={`flex items-center *:mt-2 ${hidden ? 'mb-2' : ''}`}>
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
                    className={`flex items-center overflow-hidden transition-[max-height,opacity] duration-250 ease-in *:m-1 [&_svg:not([class*='size-'])]:size-6 ${hidden ? 'max-h-0 opacity-0' : 'modmd:max-h-12 modlg:max-h-12 opacity-100'} modmd:flex-nowrap modlg:flex-nowrap flex-wrap`}
                >
                    <Link href="/home">
                        <Button variant="ghost" size="icon">
                            <House />
                        </Button>
                    </Link>
                    {user ? (
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
                                            ? 'hover:bg-accent bg-accent text-accent-foreground hover:text-accent-foreground'
                                            : 'hover:bg-accent'
                                    }
                                >
                                    <LayoutGrid />
                                </Toggle>
                            </PopoverTrigger>
                            {controlRef.current && (
                                <PopoverAnchor
                                    virtualRef={controlRef as React.RefObject<HTMLDivElement>}
                                ></PopoverAnchor>
                            )}
                            <PopoverContentChild><SpaceSwitcher recentSpaces={globalSettings.recentSpaces}/></PopoverContentChild>
                        </Popover>
                    ) : (
                        <Dialog>
                            <DialogTrigger asChild>
                            <Toggle
                                    pressed={spacePopup}
                                    onPressedChange={() => {
                                        setSpacePopup(!spacePopup);
                                        setMusicPopup(false);
                                    }}
                                    size="icon"
                                    className={
                                        spacePopup
                                            ? 'hover:bg-accent bg-accent text-accent-foreground hover:text-accent-foreground'
                                            : 'hover:bg-accent'
                                    }
                                >
                                    <LayoutGrid />
                                </Toggle>
                            </DialogTrigger>
                            <DialogContentChild>
                                <DialogTitle className="sr-only">Welcome Back!</DialogTitle>
                                <LoginForm />
                            </DialogContentChild>
                        </Dialog>
                    )}
                    <Separator orientation="vertical" className="h-6" />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                            setVolumeOn({ id: volumeOn.id, on: !volumeOn.on, ready: false })
                        }
                    >
                        {volumeOn.on ? <Volume2 /> : <VolumeX className="text-destructive" />}
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
                                        ? 'hover:bg-accent bg-accent text-accent-foreground hover:text-accent-foreground'
                                        : 'hover:bg-accent'
                                }
                            >
                                <ListMusic />
                            </Toggle>
                        </PopoverTrigger>
                        {controlRef.current && (
                            <PopoverAnchor
                                virtualRef={controlRef as React.RefObject<HTMLDivElement>}
                            ></PopoverAnchor>
                        )}
                        <PopoverContentChild>
                            <AudioPicker audio={volumeOn} setAudio={setVolumeOn} />
                        </PopoverContentChild>
                    </Popover>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <ImageIcon />
                            </Button>
                        </DialogTrigger>
                        <DialogContentChild>
                            <BackgroundPicker
                                categories={globalSettings.categories}
                                background={background}
                                setBackground={setBackground}
                            />
                        </DialogContentChild>
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
                                <>
                                    <DialogTitle className="sr-only">Welcome Back!</DialogTitle>
                                    <p>hi</p>
                                </>
                            ) : (
                                <>
                                    <DialogTitle className="sr-only">Welcome Back!</DialogTitle>
                                    <LoginForm />
                                </>
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
