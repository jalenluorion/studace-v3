'use client';

import { Module, ModuleHeader, ModuleTitle, ModuleContent, SocialButton, ExpandButton, MenuButton } from '@/components/ui/module-card';
import { Badge } from '../ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Button } from '../ui/button';
import { Database, Tables } from '@/database.types';
import { use, useEffect, useState } from 'react';
import { updateTimer } from '@/lib/supabase/modules/timer';
import { Play, Pause, XIcon } from 'lucide-react';

export default function Timer({ data }: { data: Tables<'timer'> }) {
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
        if (timeRemaining <= 0) {
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
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function setIndexString(index: string) {
        setTimerIndex(parseInt(index));
        changeTimerType(parseInt(index));
    }

    const timerWidth = timeRemaining / 60 < 10 ? ('w-[5.2rem]') : 'w-[6.625rem]';

    return (
        <Module>
            <ModuleHeader>
                <ModuleTitle>Timer</ModuleTitle>
                <div className="flex gap-1">
                    <SocialButton />
                    <MenuButton />
                </div>
            </ModuleHeader>
            <ModuleContent className='flex flex-col items-center'>
                <div className='flex mb-2'>
                    <div className='w-28 flex justify-end'>
                        <div className={'font-semibold text-4xl text-left ' + timerWidth}>{formatTime(timeRemaining)}</div>
                    </div>
                    <div className='flex gap-2 ml-2'>
                        {running ? <Button onClick={stopTimer} size='icon' variant='outline' className='rounded-full'><Pause /></Button> : <Button onClick={startTimer} size='icon' variant='outline' className='rounded-full'><Play /></Button>}
                        <Button onClick={resetTimer} size='icon' variant='outline' className='rounded-full'><XIcon /></Button>
                    </div>
                </div>
                { !running ? <Tabs
                defaultValue={timerIndex.toString()}
                    value={timerIndex.toString()}
                    onValueChange={setIndexString}
                >
                    <TabsList className="h-auto w-full p-0.5">
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