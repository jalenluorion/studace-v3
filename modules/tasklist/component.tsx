'use client';

import { Module, ModuleHeader, ModuleTitle, ModuleContent, SocialButton, ExpandButton, MenuButton } from '@/components/ui/module-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Timer, Tag } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Database, Tables } from '@/database.types';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { DatetimePicker } from '@/components/ui/datetime';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { updateTasks } from './lib';

import { useState, useRef } from 'react';

export default function Tasklist({ data }: { data: Tables<'tasklist'> }) {
    const [tasks, setTasks] = useState<Database['public']['CompositeTypes']['task'][]>(
        data.private_tasks,
    );

    const [currentTab, setCurrentTab] = useState<'tasks' | 'events'>('tasks');
    const displayed = tasks.filter((task) => task.task === (currentTab == 'tasks'));

    const [startDate, setStartDate] = useState<Date>();
    const [dueDate, setDueDate] = useState<Date>();
    const [tag, setTag] = useState<{ name: string; color: string }>();
    const [input, setInput] = useState<string>();

    const inputRef = useRef<HTMLInputElement>(null);

    function changeTab(tab: string) {
        if (tab === 'tasks') {
            setCurrentTab('tasks');
        } else if (tab === 'events') {
            setCurrentTab('events');
        }
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.keyCode === 13) {
            createTask();
        }
    }

    function createTask() {
        if (!input || input.trim() === '') {
            inputRef.current?.focus();
            return;
        }

        const newData : Tables<'tasklist'> = {
            ...data,
            private_tasks: [
                ...tasks,
                {
                    id: uuidv4(),
                    name: input,
                    tag: tag || null,
                    complete: false,
                    start: currentTab == 'tasks' ? null : startDate?.toISOString() || null,
                    end: dueDate?.toISOString() || null,
                    task: currentTab == 'tasks',
                },
            ],
        };

        setTasks(newData.private_tasks);
        setInput('');
        setTag(undefined);
        setDueDate(undefined);

        updateTasks(newData);
    }

    function clearCompleted() {
        if (currentTab == 'tasks') {
            const newData : Tables<'tasklist'> = {
                ...data,
                private_tasks: tasks.filter((task) => !task.complete && task.task),
                tasks_complete:
                    data.tasks_complete + tasks.filter((task) => task.complete && task.task).length,
            };

            setTasks(newData.private_tasks);
            updateTasks(newData);
        } else {
            const newData : Tables<'tasklist'> = {
                ...data,
                private_tasks: tasks.filter((task) => !task.complete && !task.task),
                tasks_complete:
                    data.tasks_complete +
                    tasks.filter((task) => task.complete && !task.task).length,
            };

            setTasks(newData.private_tasks);
            updateTasks(newData);
        }
    }

    return (
        <Module>
            <ModuleHeader>
                <ModuleTitle>Daily Planner</ModuleTitle>
                <SocialButton />
                <ExpandButton />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <MenuButton />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Sort by due date</DropdownMenuItem>
                        <DropdownMenuItem>Sort by tag</DropdownMenuItem>
                        <DropdownMenuItem onClick={clearCompleted}>
                            Clear completed
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </ModuleHeader>
            <ModuleContent className="flex min-h-0 flex-col">
                <Tabs
                    defaultValue="tasks"
                    value={currentTab}
                    onValueChange={changeTab}
                    className="flex min-h-0 w-full flex-1 flex-col"
                >
                    <TabsList className="h-auto w-full p-0.5">
                        <TabsTrigger className="w-full py-1" value="tasks">
                            Tasks
                        </TabsTrigger>
                        <TabsTrigger className="w-full py-1" value="events">
                            Events
                        </TabsTrigger>
                    </TabsList>
                    <div className="mt-2 flex min-h-0 flex-1 flex-col">
                        <div className="min-h-0 flex-1 overflow-y-auto">
                            {displayed.map((task) => (
                                <div key={task.id} className="mb-1 flex items-center gap-1">
                                    <Checkbox
                                        checked={task.complete || false}
                                        onCheckedChange={() => {
                                            const newData = {
                                                ...data,
                                                private_tasks: tasks.map((t) =>
                                                    t.id === task.id
                                                        ? {
                                                              ...t,
                                                              complete: !t.complete,
                                                          }
                                                        : t,
                                                ),
                                            };
                                            setTasks(newData.private_tasks);
                                            updateTasks(newData);
                                        }}
                                    />
                                    <div className={`flex flex-1 flex-col ml-1 gap-0.5`}>
                                        <p
                                            className={
                                                task.complete
                                                    ? `text-muted-foreground line-through`
                                                    : ``
                                            }
                                        >
                                            {task.name}
                                        </p>
                                        { (task.tag || task.end) && (
                                        <div className="flex gap-1">
                                            {task.tag && (
                                                <Badge
                                                    className={colorMap[task.tag.color || 'black']}
                                                >
                                                    {task.tag.name}
                                                </Badge>
                                            )}
                                            {task.end && (
                                                <Badge variant="outline">
                                                    {new Date(task.end).toLocaleString('en-US', {
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                        year: '2-digit',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: true,
                                                    })}
                                                </Badge>
                                            )}
                                        </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-2 flex items-center gap-1">
                            <Input
                                className="h-8 flex-1"
                                placeholder={currentTab == 'tasks' ? 'New Task' : 'New Event'}
                                value={input}
                                ref={inputRef}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />

                            <TooltipProvider delayDuration={300} skipDelayDuration={150}>
                                <Tooltip>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <TooltipTrigger asChild>
                                                <Toggle
                                                    className={`h-8 w-8 ${tag ? 'bg-accent text-accent-foreground' : ''}`}
                                                    size="icon"
                                                    variant="outline"
                                                >
                                                    <Tag size={20} />
                                                </Toggle>
                                            </TooltipTrigger>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Tags</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            {data.tags.map((tagOption) => (
                                                <DropdownMenuCheckboxItem
                                                    key={tagOption.name}
                                                    checked={tag === tagOption}
                                                    onCheckedChange={() =>
                                                        setTag(
                                                            tag === tagOption
                                                                ? undefined
                                                                : (tagOption as {
                                                                      name: string;
                                                                      color: string;
                                                                  }),
                                                        )
                                                    }
                                                >
                                                    {tagOption.name}
                                                </DropdownMenuCheckboxItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <TooltipContent>
                                        {tag ? (
                                            <Badge className={colorMap[tag.color]}>
                                                {tag.name}
                                            </Badge>
                                        ) : (
                                            'Tag'
                                        )}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider delayDuration={300} skipDelayDuration={150}>
                                <Tooltip>
                                    <DatetimePicker date={dueDate} setDate={setDueDate}>
                                        <TooltipTrigger asChild>
                                            <Toggle
                                                className={`h-8 w-8 ${dueDate ? 'bg-accent text-accent-foreground' : ''}`}
                                                size="icon"
                                                variant="outline"
                                            >
                                                <Timer size={20} />
                                            </Toggle>
                                        </TooltipTrigger>
                                    </DatetimePicker>
                                    <TooltipContent>
                                        {dueDate ? (
                                            <Badge variant="outline">
                                                {dueDate.toLocaleString('en-US', {
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    year: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true,
                                                })}
                                            </Badge>
                                        ) : (
                                            'Due Date'
                                        )}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <Button className="h-8 w-8" size="icon" onClick={() => createTask()}>
                                <Plus size={20} />
                            </Button>
                        </div>
                    </div>
                </Tabs>
            </ModuleContent>
        </Module>
    );
}

type options = {
    [key: string]: string;
};

const colorMap: options = {
    red: 'bg-red-600 text-white',
    orange: 'bg-orange-600 text-white',
    yellow: 'bg-yellow-600 text-white',
    green: 'bg-green-600 text-white',
    teal: 'bg-teal-600 text-white',
    blue: 'bg-blue-600 text-white',
    indigo: 'bg-indigo-600 text-white',
    purple: 'bg-purple-600 text-white',
    pink: 'bg-pink-600 text-white',
    black: 'bg-white text-black',
};
