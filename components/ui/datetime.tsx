'use client';

import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState, useRef } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';

interface DatetimePickerV1Props {
    children: React.ReactNode;
    date: Date | undefined;
    setDate: (date: Date) => void;
}

export function DatetimePicker({ children, date, setDate }: DatetimePickerV1Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [time, setTime] = useState<string>('05:00');
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
                        fromYear={2000}
                        toYear={new Date().getFullYear()}
                        disabled={(date) =>
                            Number(date) < Date.now() - 1000 * 60 * 60 * 24 ||
                            Number(date) > Date.now() + 1000 * 60 * 60 * 24 * 30
                        }
                    />
                    <Select
                        defaultValue={time}
                        onValueChange={(e) => {
                            setTime(e);
                            if (date) {
                                const [hours, minutes] = e.split(':');
                                const newDate = new Date(date.getTime());
                                newDate.setHours(parseInt(hours), parseInt(minutes));
                                setDate(newDate);
                            }
                        }}
                    >
                        <SelectTrigger className="my-2 mr-2 w-[120px] font-normal focus:ring-0">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="fixed left-0 top-2 mr-2 border-none shadow-none">
                            <ScrollArea className="h-[15rem]">
                                {Array.from({ length: 96 }).map((_, i) => {
                                    const hour = Math.floor(i / 4);
                                    const minute = ((i % 4) * 15).toString().padStart(2, '0');
                                    const amPm = hour < 12 ? 'AM' : 'PM';
                                    const displayHour =
                                        hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                                    return (
                                        <SelectItem
                                            key={i}
                                            value={`${hour.toString().padStart(2, '0')}:${minute}`}
                                        >
                                            {`${displayHour}:${minute} ${amPm}`}
                                        </SelectItem>
                                    );
                                })}
                            </ScrollArea>
                        </SelectContent>
                    </Select>
                </div>
            </PopoverContent>
        </Popover>
    );
}
