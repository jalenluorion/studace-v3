import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { CSSTransition } from 'react-transition-group';
import { CarouselModule } from './control/modules';

export default function SpaceModules({
    modules,
    data,
    hidden,
}: {
    modules: string[];
    data: unknown[];
    hidden: boolean;
}) {
    return (
        <CSSTransition
            in={!hidden}
            timeout={250}
            classNames="right"
            unmountOnExit
        >
            <div className="flex h-[38rem] w-full items-center @container sm:w-72 md:h-full md:w-72 lg:h-full lg:w-72">
                <Carousel
                    opts={{
                        align: 'start',
                        watchDrag: false,
                    }}
                    orientation="vertical"
                    className="w-full"
                >
                    <CarouselContent className="mt-0 h-[16rem] @[38rem]:h-[32rem] @[54rem]:h-[48rem]">
                        {modules.map((module, index) => (
                            <CarouselModule key={index} name={module} data={data[index]} />
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </CSSTransition>
    );
}
