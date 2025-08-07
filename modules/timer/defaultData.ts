import { Tables } from '@/database.types';

export const defaultTimers = [
    { name: 'Study Time', time: 1500 },
    { name: 'Break Time', time: 300 },
];

export const defaultTimer: Tables<'timer'> = {
    last_updated: new Date().toISOString(),
    running: false,
    space_id: '',
    time_remaining: defaultTimers[0].time,
    timers: defaultTimers,
    timers_complete: 0,
    current_timer: 0,
};
