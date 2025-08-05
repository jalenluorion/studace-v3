import { defaultTimer } from './defaultData';
import Timer from './component';
import { Tables } from '@/database.types';
import type { BaseModule } from '../types';

export type TimerModule = BaseModule<Tables<'timer'>>;

const defaultTimerModule: TimerModule = {
    name: 'timer',
    size: '1x2',
    data: defaultTimer,
    component: Timer,
};

export default defaultTimerModule;
