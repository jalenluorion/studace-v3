import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { CSSTransition } from 'react-transition-group';
import { CarouselModule } from './control/modules';
import { TransitionStatus } from 'react-transition-state';

export default function SpaceModules({
    modules,
    data,
    status,
}: {
    modules: string[];
    data: unknown[];
    status: TransitionStatus
}) {
    return (
        <div className={`transition duration-250${
            status === "preEnter" || status === "exiting"
              ? " transform translate-x-[105%]"
              : ""
          }`}>
            <div className="modsm:w-72 modmd:h-full modmd:w-72 modlg:h-full modlg:w-72 flex h-[38rem] w-full items-center @container">
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
        </div>
    );
}
