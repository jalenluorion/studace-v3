import { Tables } from '@/database.types';
import Timer from '@/components/modules/timer';

const defaultTimers = [
    {
        name: 'Study Time',
        time: 1500,
    },
    {
        name: 'Break Time',
        time: 300,
    },
]

const defaultTimer: Tables<'timer'> = {
    last_updated: new Date().toISOString(),
    running: false,
    space_id: '',
    time_remaining: defaultTimers[0].time,
    timers: defaultTimers,
    timers_complete: 0,
    current_timer: 0,
};

export interface TimerModule {
    name: string;
    size: string;
    default: Tables<'timer'>;
    component: (props: { data: Tables<'timer'> }) => JSX.Element;
}

const timerModule: TimerModule = {
    name: 'timer',
    size: '1x2',
    default: defaultTimer,
    component: Timer,
};

export default timerModule;
