import { CarouselItem } from '../../ui/carousel';
import type { ModuleType } from '@/modules/types';
import type { ModuleSize } from '@/modules/types';

export const GetModuleSize = (moduleSize: ModuleSize) => {
    switch (moduleSize) {
        case '1x2':
            return [`basis-1/2 @[38rem]:basis-1/4 @[54rem]:basis-1/6`, 'h-1b'];
        case '2x2':
            return [`basis-2/2 @[38rem]:basis-2/4 @[54rem]:basis-2/6`, 'h-2b'];
        case '3x2':
            return [`basis-2/2 @[38rem]:basis-3/4 @[54rem]:basis-3/6`, 'h-2b @[38rem]:h-3b'];
        case '4x2':
            return [`basis-2/2 @[38rem]:basis-4/4 @[54rem]:basis-4/6`, 'h-2b @[38rem]:h-4b'];
        default:
            return [`basis-1/2 @[38rem]:basis-1/4 @[54rem]:basis-1/6`, 'h-1b'];
    }
};

export function Module({ module }: { module: ModuleType }) {
    const size = GetModuleSize(module.size);

    return (
        <div className={size[1]}>
            <module.component data={module.data} />
        </div>
    );
}

export function CarouselModule({ module }: { module: ModuleType }) {
    const size = GetModuleSize(module.size);

    return (
        <CarouselItem className={`flex items-center pt-0 ${size[0]}`}>
            <div className={size[1]}>
                <module.component data={module.data} />
            </div>
        </CarouselItem>
    );
}
