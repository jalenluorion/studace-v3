import { allModules, AllSupabaseModules } from '@/config/default';
import { Tables } from '@/database.types';
import { CarouselItem } from '../../ui/carousel';

const GetModuleComponent = (module: string) => {
    const moduleData = allModules.find((mod) => mod.name === module);
    if (moduleData) {
        return moduleData.component;
    }
    return null;
};

export const GetModuleSize = (module: string) => {
    const moduleData = allModules.find((mod) => mod.name === module);
    if (!moduleData) {
        return;
    }
    switch (moduleData.size) {
        case '1x2':
            return [`basis-1/2 @[38rem]:basis-1/4 @[54rem]:basis-1/6`, 'h-1b'];
        case '2x2':
            return [`basis-2/2 @[38rem]:basis-2/4 @[54rem]:basis-2/6`, 'h-2b'];
        case '3x2':
            return [`basis-2/2 @[38rem]:basis-3/4 @[54rem]:basis-3/6`, 'h-2b @[38rem]:h-3b'];
        case '4x2':
            return [`basis-2/2 @[38rem]:basis-4/4 @[54rem]:basis-4/6`, 'h-2b @[38rem]:h-4b'];
        default:
            return;
    }
};

export function Module({ name, data }: { name: string; data: unknown }) {
    // FIXME: Unsafe typing
    const ModuleComponent = GetModuleComponent(name) as (props: {
        data: Tables<AllSupabaseModules>;
    }) => JSX.Element; // Update the type of ModuleComponent
    if (!ModuleComponent) {
        return null;
    }
    const size = GetModuleSize(name);
    if (!size) {
        return null;
    }

    return (
        <div className={size[1]}>
            <ModuleComponent data={data as Tables<AllSupabaseModules>} />
        </div>
    );
}
export function CarouselModule({ name, data }: { name: string; data: unknown }) {
    // FIXME: Unsafe typing
    const ModuleComponent = GetModuleComponent(name) as (props: {
        data: Tables<AllSupabaseModules>;
    }) => JSX.Element; // Update the type of ModuleComponent
    if (!ModuleComponent) {
        return null;
    }
    const size = GetModuleSize(name);
    if (!size) {
        return null;
    }

    return (
        <CarouselItem className={`flex items-center pt-0 ${size[0]}`}>
            <div className={size[1]}>
                <ModuleComponent data={data as Tables<AllSupabaseModules>} />
            </div>
        </CarouselItem>
    );
}
