'use client';

import {
    Module,
    ModuleHeader,
    ModuleTitle,
    ModuleContent,
    SocialButton,
    ExpandButton,
    MenuButton,
    ModuleAction,
} from '@/components/ui/module-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Timer, Tag, Edit, Trash, X } from 'lucide-react';
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
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from '@/components/ui/select';
import { updateTasks, updateTags } from './lib';

import { useState, useRef } from 'react';

export default function Tasklist({ data }: { data: Tables<'tasklist'> }) {
    // Sorting state with localStorage persistence per space
    const spaceSortKey = `tasklist-sortType-${data.space_id}`;
    const [sortType, setSortTypeState] = useState<'none' | 'due' | 'tag'>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem(spaceSortKey) as 'none' | 'due' | 'tag') || 'none';
        }
        return 'none';
    });

    function setSortType(type: 'none' | 'due' | 'tag') {
        setSortTypeState(type);
        if (typeof window !== 'undefined') {
            localStorage.setItem(spaceSortKey, type);
        }
    }

    // Sorting functions
    function sortTasks(tasks: Database['public']['CompositeTypes']['task'][]): Database['public']['CompositeTypes']['task'][] {
        if (sortType === 'due') {
            return [...tasks].sort((a, b) => {
                // No due date should be at the top
                if (!a.end && !b.end) return 0;
                if (!a.end) return -1;
                if (!b.end) return 1;
                const aDate = new Date(a.end).getTime();
                const bDate = new Date(b.end).getTime();
                return aDate - bDate;
            });
        } else if (sortType === 'tag') {
            return [...tasks].sort((a, b) => {
                const aTag = a.tag?.name?.toLowerCase() || '';
                const bTag = b.tag?.name?.toLowerCase() || '';
                if (aTag < bTag) return -1;
                if (aTag > bTag) return 1;
                return 0;
            });
        }
        return tasks;
    }
    const [tasks, setTasks] = useState<Database['public']['CompositeTypes']['task'][]>(
        data.private_tasks,
    );

    const [currentTab, setCurrentTab] = useState<'tasks' | 'events'>('tasks');
    const displayed = sortTasks(tasks.filter((task) => task.task === (currentTab == 'tasks')));

    const [startDate, setStartDate] = useState<Date>();
    const [dueDate, setDueDate] = useState<Date>();
    const [tag, setTag] = useState<{ name: string; color: string }>();
    const [input, setInput] = useState<string>();
    const [isEditingTags, setIsEditingTags] = useState<boolean>(false);
    const [tags, setTags] = useState<Database['public']['CompositeTypes']['tag'][]>(data.tags);

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

        const newData: Tables<'tasklist'> = {
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
            const newData: Tables<'tasklist'> = {
                ...data,
                private_tasks: tasks.filter((task) => !(task.complete && task.task)),
                tasks_complete:
                    data.tasks_complete + tasks.filter((task) => (task.complete && task.task)).length,
            };

            setTasks(newData.private_tasks);
            updateTasks(newData);
        } else {
            const newData: Tables<'tasklist'> = {
                ...data,
                private_tasks: tasks.filter((task) => !(task.complete && !task.task)),
                tasks_complete:
                    data.tasks_complete +
                    tasks.filter((task) => (task.complete && !task.task)).length,
            };

            setTasks(newData.private_tasks);
            updateTasks(newData);
        }
    }

    function updateTagName(index: number, newName: string) {
        const updatedTags = [...tags];
        updatedTags[index] = {
            ...updatedTags[index],
            name: newName,
        };
        setTags(updatedTags);
    }

    function updateTagColor(index: number, newColor: string) {
        const updatedTags = [...tags];
        updatedTags[index] = {
            ...updatedTags[index],
            color: newColor,
        };
        setTags(updatedTags);
    }

    function addNewTag() {
        const newTag: Database['public']['CompositeTypes']['tag'] = {
            name: 'New Tag',
            color: 'blue',
        };
        setTags([...tags, newTag]);
    }

    function deleteTag(index: number) {
        const updatedTags = tags.filter((_, i) => i !== index);
        setTags(updatedTags);
    }

    function saveAllTags() {
        updateTags(data.space_id, tags);
        setIsEditingTags(false);
    }

    return (
        <Module>
            <ModuleHeader>
                <ModuleTitle>Daily Planner</ModuleTitle>
                <ModuleAction>
                    <SocialButton />
                    <ExpandButton />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <MenuButton />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuCheckboxItem
                                checked={sortType === 'due'}
                                onCheckedChange={(checked) => setSortType(checked ? 'due' : 'none')}
                            >
                                Sort by due date
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={sortType === 'tag'}
                                onCheckedChange={(checked) => setSortType(checked ? 'tag' : 'none')}
                            >
                                Sort by tag
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem onClick={clearCompleted}>
                                Clear completed
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </ModuleAction>
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
                    <div className="flex min-h-0 flex-1 flex-col">
                        <div className="min-h-0 flex-1 overflow-y-auto flex flex-col gap-2">
                            {displayed.map((task) => (
                                <div key={task.id} className="flex items-center gap-1">
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
                                    <div className={`ml-1 flex flex-1 flex-col gap-0.5`}>
                                        <p
                                            className={
                                                task.complete
                                                    ? `text-muted-foreground line-through`
                                                    : ``
                                            }
                                        >
                                            {task.name}
                                        </p>
                                        {(task.tag || task.end) && (
                                            <div className="flex gap-1">
                                                {task.tag && (
                                                    <Badge variant="outline"
                                                        className={
                                                            colorMap[task.tag.color || 'black']
                                                        }
                                                    >
                                                        {task.tag.name}
                                                    </Badge>
                                                )}
                                                {task.end && (
                                                    <Badge variant="outline">
                                                        {(() => {
                                                            const dateObj = new Date(task.end);
                                                            const now = new Date();
                                                            const isSameYear = dateObj.getFullYear() === now.getFullYear();
                                                            const month = dateObj.toLocaleString('en-US', { month: 'short' });
                                                            const day = dateObj.getDate();
                                                            const year = dateObj.getFullYear();
                                                            let hour = dateObj.getHours();
                                                            const minute = dateObj.getMinutes().toString().padStart(2, '0');
                                                            const ampm = hour >= 12 ? 'PM' : 'AM';
                                                            hour = hour % 12;
                                                            if (hour === 0) hour = 12;
                                                            const timeStr = `${hour}:${minute} ${ampm}`;
                                                            if (isSameYear) {
                                                                return `${month} ${day}, ${timeStr}`;
                                                            } else {
                                                                return `${month} ${day} ${year}, ${timeStr}`;
                                                            }
                                                        })()}
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
                                value={input ?? ''}
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
                                        <DropdownMenuContent className="">
                                            <div className="flex items-center justify-between">
                                                <DropdownMenuLabel>Tags</DropdownMenuLabel>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-6 w-6 p-0"
                                                    onClick={() => setIsEditingTags(!isEditingTags)}
                                                >
                                                    <Edit size={14} />
                                                </Button>
                                            </div>
                                            <DropdownMenuSeparator />
                                            
                                            {isEditingTags ? (
                                                <div className="space-y-2 p-2">
                                                    {tags.map((tagOption, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <Input
                                                                value={tagOption.name || ''}
                                                                onChange={(e) =>
                                                                    updateTagName(index, e.target.value)
                                                                }
                                                                className="h-7 flex-1 text-sm"
                                                            />
                                                            <Select
                                                                value={tagOption.color || 'blue'}
                                                                onValueChange={(value) => updateTagColor(index, value)}
                                                            >
                                                                <SelectTrigger className="h-7 w-20 border px-2 text-xs">
                                                                    <SelectValue placeholder="Color" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {Object.keys(colorMap).map((color) => (
                                                                        <SelectItem key={color} value={color}>
                                                                            {color}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                                                                onClick={() => deleteTag(index)}
                                                            >
                                                                <Trash size={12} />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                    <div className="flex gap-2 pt-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={addNewTag}
                                                            className="flex-1"
                                                        >
                                                            <Plus size={14} />
                                                            Add Tag
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            onClick={saveAllTags}
                                                            className="flex-1"
                                                        >
                                                            Save Changes
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    {tags.map((tagOption, index) => (
                                                        <DropdownMenuCheckboxItem
                                                            key={index}
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
                                                </>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <TooltipContent className={tag ? colorMap[tag.color] : ''}>
                                        {tag ? tag.name : 'Tag'}
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
                                        {dueDate
                                            ? dueDate.toLocaleString('en-US', {
                                                weekday: 'long',
                                                month: 'short',
                                                day: '2-digit',
                                                year: undefined,
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true,
                                            })
                                            : 'Due Date'
                                        }
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
    red: 'bg-red-600 text-white fill-red-600',
    orange: 'bg-orange-600 text-white fill-orange-600',
    yellow: 'bg-yellow-600 text-white fill-yellow-600',
    green: 'bg-green-600 text-white fill-green-600',
    teal: 'bg-teal-600 text-white fill-teal-600',
    blue: 'bg-blue-600 text-white fill-blue-600',
    indigo: 'bg-indigo-600 text-white fill-indigo-600',
    purple: 'bg-purple-600 text-white fill-purple-600',
    pink: 'bg-pink-600 text-white fill-pink-600',
    black: 'bg-white text-black fill-black border border-black',
};
