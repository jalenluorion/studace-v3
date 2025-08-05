import type { JSX } from 'react';
import { allModules } from './index';
import { Tables } from '@/database.types';

export type ModuleSize = "1x2" | "2x2" | "3x2" | "4x2";

/**
 * Base module interface for all modules.
 * Defines the structure that each module should adhere to.
 */
export interface BaseModule<T> {
    name: string;
    size: ModuleSize;
    data: T;
    component: (props: { data: T }) => JSX.Element;
}

/**
 * Type representing all available module keys.
 */
export type AllModules = keyof typeof allModules;

/**
 * Type representing all Studace.live modules with its associated data type.
 * 
 * BaseModule
 * - name: string
 * - size: ModuleSize
 * - data: Tables<AllModules>
 * - component: (props: { data: Tables<AllModules> }) => JSX.Element
 */
export type ModuleType = BaseModule<Tables<AllModules>>;
