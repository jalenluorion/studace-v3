import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { CSSTransition } from 'react-transition-group';
import { CarouselCard, CarouselAddCard } from './control/userCard';
import { SocialUser } from './control/social';
import { TransitionStatus } from 'react-transition-state';

export default function SpaceSocial({
    activeUsers,
    status
}: {
    activeUsers: SocialUser & { presence_ref: string }[];
    status: TransitionStatus;
}) {
    return (
        <div className={`transition duration-250${
            status === "preEnter" || status === "exiting"
              ? " transform -translate-x-[105%]"
              : ""
          }`}>
            <div className="flex h-[38rem] w-full items-center @container modsm:w-48 modmd:h-full modmd:w-48 modlg:h-full modlg:w-48">
                <Carousel
                    opts={{
                        align: 'start',
                        watchDrag: false,
                    }}
                    orientation="vertical"
                    className="w-full"
                >
                    <CarouselContent className="mt-0 h-[16rem] @[38rem]:h-[32rem] @[54rem]:h-[48rem]">
                        {activeUsers.map((user, index) => (
                            <CarouselCard key={index} user={user} />
                        ))}
                        <CarouselAddCard />
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    );
}
