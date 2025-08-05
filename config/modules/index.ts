import defaultTasklistModule from './tasklist';
import defaultTimerModule from './timer';
import type { AllModules } from './types';

/**
 * Studace.live Modules
 *
 * Available:
 * - Tasklist (in development)
 * - Timer (in development)
 *
 * Planned:
 * - Chat (TBD)
 * - Gradebook (TBD)
 * - Notelist (TBD)
 */
export const allModules = {
  tasklist: defaultTasklistModule,
  timer: defaultTimerModule,
};

/**
 * Default Studace.live modules: tasklist, timer
 */
export const defaultModuleKeys: Array<AllModules> = ["tasklist", "timer"];


