'use client';

import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';

interface DatetimePickerV1Props {
    children: React.ReactNode;
    date: Date | undefined;
    setDate: (date: Date) => void;
}

export function DatetimePicker({ children, date, setDate }: DatetimePickerV1Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [time, setTime] = useState<string>('23:59');
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild ref={buttonRef}>
                {children}
            </PopoverTrigger>
            <PopoverContent
                className="flex w-auto flex-col items-center p-0"
                align="end"
                onCloseAutoFocus={(e) => {
                    e.preventDefault();
                    buttonRef.current?.focus();
                }}
            >
                <Label className="mt-2">Task Due Date</Label>
                <div className="flex items-start">
                    <Calendar
                        mode="single"
                        captionLayout="dropdown"
                        selected={date}
                        onSelect={(selectedDate) => {
                            const [hours, minutes] = time.split(':');
                            selectedDate?.setHours(parseInt(hours), parseInt(minutes));
                            setDate(selectedDate!);
                        }}
                        onDayClick={() => setIsOpen(false)}
                        disabled={(date) =>
                            Number(date) < Date.now() - 1000 * 60 * 60 * 24 ||
                            Number(date) > Date.now() + 1000 * 60 * 60 * 24 * 30
                        }
                    />
                    <div className="my-3 mr-3 mb-3 w-[120px]">
                        <button className="flex h-8 w-full items-center justify-between rounded-md border border-input px-3 py-2 text-sm font-medium ring-offset-background focus:ring-0">
                            <span>
                                {(() => {
                                    const [hour, minute] = time.split(':');
                                    const hourNum = parseInt(hour);
                                    const amPm = hourNum < 12 ? 'AM' : 'PM';
                                    const displayHour = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
                                    return `${displayHour}:${minute} ${amPm}`;
                                })()}
                            </span>
                        </button>
                        <div className="mt-4 border-none shadow-none">
                            <ScrollArea className="max-h-[260px] overflow-y-auto overflow-x-hidden">
                                <div className="">
                                    {[
                                        ...Array.from({ length: 48 }).map((_, i) => {
                                            const hour = Math.floor(i / 2);
                                            const minute = (i % 2 === 0 ? '00' : '30');
                                            const amPm = hour < 12 ? 'AM' : 'PM';
                                            const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                                            const value = `${hour.toString().padStart(2, '0')}:${minute}`;
                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => {
                                                        setTime(value);
                                                        if (date) {
                                                            const [hours, minutes] = value.split(':');
                                                            const newDate = new Date(date.getTime());
                                                            newDate.setHours(parseInt(hours), parseInt(minutes));
                                                            setDate(newDate);
                                                        }
                                                    }}
                                                    className={`relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                                                        time === value ? 'bg-accent text-accent-foreground' : ''
                                                    }`}
                                                >
                                                    {`${displayHour}:${minute} ${amPm}`}
                                                </button>
                                            );
                                        }),
                                        // Add 11:59 PM
                                        <button
                                            key="11:59"
                                            onClick={() => {
                                                setTime('23:59');
                                                if (date) {
                                                    const newDate = new Date(date.getTime());
                                                    newDate.setHours(23, 59);
                                                    setDate(newDate);
                                                }
                                            }}
                                            className={`relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                                                time === '23:59' ? 'bg-accent text-accent-foreground' : ''
                                            }`}
                                        >
                                            11:59 PM
                                        </button>
                                    ]}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
