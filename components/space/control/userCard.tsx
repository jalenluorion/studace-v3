import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CarouselItem } from '../../ui/carousel';
import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { SocialUser } from './social';

export function UserCard({ user }: { user: SocialUser & { presence_ref: string } }) {
    const [showUsername, setShowUsername] = useState(false);

    return (
        <Card
            className="relative flex h-full w-full flex-1 flex-col modsm:w-48 modmd:w-48 modlg:w-48"
            onMouseEnter={() => setShowUsername(true)}
            onMouseLeave={() => setShowUsername(false)}
        >
            <div className="flex h-full items-center justify-center">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={user.profile_picture} />
                    <AvatarFallback>{user.initials?.toUpperCase()}</AvatarFallback>
                </Avatar>
            </div>
            <div
                className={`absolute bottom-0 flex w-full items-center justify-center ${showUsername ? 'opacity-100' : 'opacity-0'} transition-opacity`}
            >
                <p>{user.username}</p>
            </div>
        </Card>
    );
}

export function AddCard() {
    const [showUsername, setShowUsername] = useState(false);

    return (
        <Card
            className="relative flex h-full w-full flex-1 flex-col modsm:w-48 modmd:w-48 modlg:w-48"
            onMouseEnter={() => setShowUsername(true)}
            onMouseLeave={() => setShowUsername(false)}
        >
            <div className="flex h-full items-center justify-center">
                <Button className="h-12 w-12 rounded-full" size={'icon'}>
                    <UserPlus size="24" />
                </Button>
            </div>
            <div
                className={`absolute bottom-0 flex w-full items-center justify-center ${showUsername ? 'opacity-100' : 'opacity-0'} transition-opacity`}
            >
                <p>Invite Friend</p>
            </div>
        </Card>
    );
}

export function CarouselCard({ user }: { user: SocialUser & { presence_ref: string } }) {
    return (
        <CarouselItem className="flex basis-1/2 items-center pt-0 @[38rem]:basis-1/4 @[54rem]:basis-1/6">
            <div className="h-1b">
                <UserCard user={user} />
            </div>
        </CarouselItem>
    );
}

export function CarouselAddCard() {
    return (
        <CarouselItem className="flex basis-1/2 items-center pt-0 @[38rem]:basis-1/4 @[54rem]:basis-1/6">
            <div className="h-1b">
                <AddCard />
            </div>
        </CarouselItem>
    );
}
