'use client';

import { Module, ModuleHeader, ModuleTitle, ModuleContent, SocialButton, ExpandButton, MenuButton, ModuleAction } from '@/components/ui/module-card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Database, Tables } from '@/database.types';
import { use, useEffect, useState } from 'react';
import { updateTimer } from './lib';
import { Play, Pause, XIcon } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

export default function Timer({ data }: { data: Tables<'timer'> }) {
    // Local state for editing durations
    const [studyDuration, setStudyDuration] = useState<number>(data.timers[0]?.time ? Math.floor(data.timers[0].time / 60) : 25);
    const [breakDuration, setBreakDuration] = useState<number>(data.timers[1]?.time ? Math.floor(data.timers[1].time / 60) : 5);

    function saveDurations() {
        const newTimers = [...data.timers];
        if (newTimers[0]) newTimers[0].time = studyDuration * 60;
        if (newTimers[1]) newTimers[1].time = breakDuration * 60;
        const newData: Tables<'timer'> = {
            ...data,
            timers: newTimers,
            time_remaining: newTimers[timerIndex]?.time || 25 * 60,
            last_updated: new Date().toISOString(),
        };
        setTimeRemaining(newData.time_remaining);
        updateTimer(newData);
    }
    const passedTime = Math.floor((new Date().getTime() - new Date(data.last_updated + "Z").getTime()) / 1000);
    const [timerIndex, setTimerIndex] = useState<number>(data.current_timer);
    const [timeRemaining, setTimeRemaining] = useState(data.running ? data.time_remaining - passedTime : data.time_remaining);
    const [running, setRunning] = useState(data.running);

    useEffect(() => {
        if (running) {
            const interval = setInterval(() => {
                const newTime = timeRemaining - 1;
                setTimeRemaining(newTime);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [running, timeRemaining]);

    useEffect(() => {
        if (timeRemaining <= 0 && running) {
            alert(data.timers[timerIndex].name + " complete!");
            const newIndex = data.timers[timerIndex + 1] ? timerIndex + 1 : 0;
            const newData : Tables<'timer'> = {
                ...data,
                time_remaining: data.timers[newIndex].time || 25*60,
                running: false,
                last_updated: new Date().toISOString(),
                timers_complete: data.timers_complete + 1,
                current_timer: newIndex
            };

            setRunning(newData.running);
            setTimerIndex(newData.current_timer);
            setTimeRemaining(newData.time_remaining);

            updateTimer(newData);
        }
    }, [data, timeRemaining, timerIndex]);

    function startTimer() {
        const newData : Tables<'timer'> = {
            ...data,
            time_remaining: timeRemaining,
            running: true,
            last_updated: new Date().toISOString()
        };
        setRunning(newData.running);

        updateTimer(newData);
    }

    function stopTimer() {
        const newData : Tables<'timer'> = {
            ...data,
            time_remaining: timeRemaining,
            running: false,
            last_updated: new Date().toISOString()
        };
        setRunning(newData.running);

        updateTimer(newData);
    }

    function resetTimer() {
        const newData : Tables<'timer'> = {
            ...data,
            time_remaining: data.timers[timerIndex].time || 25*60,
            running: false,
            last_updated: new Date().toISOString()
        };
        setRunning(newData.running);
        setTimeRemaining(newData.time_remaining);

        updateTimer(newData);
    }

    function changeTimerType(newIndex: number) {
        const newData : Tables<'timer'> = {
            ...data,
            time_remaining: data.timers[newIndex].time || 25*60,
            running: false,
            last_updated: new Date().toISOString(),
            current_timer: newIndex
        };
        setRunning(newData.running);
        setTimerIndex(newData.current_timer);
        setTimeRemaining(newData.time_remaining);

        updateTimer(newData);
    }

    function formatTime(time: number) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        // Pad minutes and seconds with leading zeros to always be 2 digits
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function setIndexString(index: string) {
        setTimerIndex(parseInt(index));
        changeTimerType(parseInt(index));
    }



    return (
        <Module>
            <ModuleHeader>
                <ModuleTitle>Timer</ModuleTitle>
                <ModuleAction>
                    <SocialButton />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <MenuButton />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Adjust Durations</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className="flex flex-col gap-2 p-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm w-16">Study</span>
                                    <Input
                                        type="number"
                                        min={1}
                                        value={studyDuration}
                                        onChange={e => setStudyDuration(Number(e.target.value))}
                                        className="h-7 w-16 text-sm"
                                    />
                                    <span className="text-xs">min</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm w-16">Break</span>
                                    <Input
                                        type="number"
                                        min={1}
                                        value={breakDuration}
                                        onChange={e => setBreakDuration(Number(e.target.value))}
                                        className="h-7 w-16 text-sm"
                                    />
                                    <span className="text-xs">min</span>
                                </div>
                                <Button size="sm" className="mt-2" onClick={saveDurations}>
                                    Save
                                </Button>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </ModuleAction>
            </ModuleHeader>
            <ModuleContent className='flex flex-col items-center gap-2'>
                <div className='flex gap-2'>
                        <div className={'font-semibold text-3xl text-left'}>{formatTime(timeRemaining)}</div>
                        {running ? <Button onClick={stopTimer} size='icon' variant='outline' className='rounded-full'><Pause /></Button> : <Button onClick={startTimer} size='icon' variant='outline' className='rounded-full'><Play /></Button>}
                        <Button onClick={resetTimer} size='icon' variant='outline' className='rounded-full'><XIcon /></Button>
                </div>
                { !running ? <Tabs
                defaultValue={timerIndex.toString()}
                    value={timerIndex.toString()}
                    onValueChange={setIndexString}
                >
                    <TabsList className="h-auto w-full rounded-full p-0.5">
                        {data.timers.map((timer, index) => (
                            <TabsTrigger key={index} value={index.toString()} className="flex-1 px-2.5 py-0.5 rounded-full font-semibold text-xs">
                                {timer.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs> :
                <Badge>{data.timers[timerIndex].name}</Badge>}
            </ModuleContent>
        </Module>
    );
};