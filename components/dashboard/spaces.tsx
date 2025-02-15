import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { getAuthUser, getSpaces } from '@/lib/supabase/user';
import { Skeleton } from '@/components/ui/skeleton';

export default async function SpaceList() {
    const user = await getAuthUser();
    
    const spaces = await getSpaces(user.id);

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {spaces.map((space) => (
                <button key={space.space_id} className="w-full">
                    <Link key={space.space_id} href={`/space/${space.space_id}`} prefetch={false}>
                        <Card
                            key={space.space_id}
                            className="pointer-events-none relative aspect-video w-full overflow-hidden border-none transition-transform active:scale-95 active:transform"
                        >
                            <div className="absolute z-10 flex h-full w-full items-center justify-center">
                                <CardTitle className="text-white shadow">{space.name}</CardTitle>
                            </div>
                            <Image
                                src={`https://img.youtube.com/vi/${space.background}/maxresdefault.jpg`}
                                fill={true}
                                alt="Video Thumbnail"
                                className="pointer-events-auto object-cover transition-transform hover:scale-105 hover:transform"
                            />
                        </Card>
                    </Link>
                </button>
            ))}
        </div>
    );
}

export async function SpaceLoader() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="w-full aspect-video" />
            ))}
        </div>
    );
}