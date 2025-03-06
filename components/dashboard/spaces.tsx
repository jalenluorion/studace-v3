import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Tables } from '@/database.types';

export default async function SpaceList({ spaces }: { spaces: Tables<'space'>[] }) {
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
                                <CardTitle className="text-white shadow-sm">{space.name}</CardTitle>
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