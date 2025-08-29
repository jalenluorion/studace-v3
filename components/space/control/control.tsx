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

import SettingsEditor from './settings';
import userMenu from '@/components/dashboard/user-menu';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Control({
    spaceUser,
    spaceSettings,
    spaceGlobals,
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
}: {
    spaceUser: Tables<'profile'> | null;
    spaceSettings: Tables<'space'>;
    spaceGlobals: globalSettings;
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
                className="modmd:rounded-b-lg modlg:rounded-b-lg items-center gap-0 rounded-b-none p-1"
                ref={controlRef}
            >
                <div className={`flex items-center gap-2 *:mt-1 ${hidden ? 'mb-1' : ''}`}>
                    <Button variant="ghost" size="xs" onClick={() => setHidden(!hidden)}>
                        {hidden ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                    <CardTitle>{spaceSettings.name}</CardTitle>
                    <Button variant="ghost" size="xs" onClick={editFullScreen}>
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
                    {spaceUser ? (
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
                            <PopoverContentChild>
                                <SpaceSwitcher recentSpaces={spaceGlobals.recentSpaces} />
                            </PopoverContentChild>
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
                    <div className="h-6">
                        <Separator orientation="vertical" />
                    </div>
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
                                categories={spaceGlobals.categories}
                                background={background}
                                setBackground={setBackground}
                            />
                        </DialogContentChild>
                    </Dialog>
                    <div className="h-6">
                        <Separator orientation="vertical" className="h-6" />
                    </div>
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
                    <div className="h-6">
                        <Separator orientation="vertical" className="h-6" />
                    </div>
                    {spaceUser ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={spaceUser.avatar || ''} />
                                        <AvatarFallback>
                                            {spaceUser.first_name && spaceUser.last_name
                                                ? `${spaceUser.first_name[0]}${spaceUser.last_name[0]}`
                                                : 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            {userMenu({ profile: spaceUser })}
                        </DropdownMenu>
                    ) : (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="" />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DialogTrigger>
                            <DialogContentChild>
                                <DialogTitle className="sr-only">Welcome Back!</DialogTitle>
                                <LoginForm />
                            </DialogContentChild>
                        </Dialog>
                    )}
                    {spaceUser ? (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Settings />
                                </Button>
                            </DialogTrigger>
                            <DialogContentChild>
                                <SettingsEditor
                                    spaceUserId={spaceUser.user_id}
                                    spaceSettings={spaceSettings}
                                />
                            </DialogContentChild>
                        </Dialog>
                    ) : (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Settings />
                                </Button>
                            </DialogTrigger>
                            <DialogContentChild>
                                <DialogTitle className="sr-only">Welcome Back!</DialogTitle>
                                <LoginForm />
                            </DialogContentChild>
                        </Dialog>
                    )}
                </div>
            </Card>
        </div>
    );
}
