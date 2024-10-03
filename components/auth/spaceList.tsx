import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Tables } from '@/database.types';
import Link from 'next/link';
import { getSpaces } from '@/lib/supabase/user';
import { createClient } from '@/lib/supabase/server';

export default async function SpaceList() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    const spaces = await getSpaces(user.id);

    return (
        <div className="flex flex-wrap">
            {spaces.map((space) => (
                <Link key={space.space_id} href={`/space/${space.space_id}`} prefetch={false}>
                <button key={space.space_id}>
                    <Card key={space.space_id} className='relative overflow-hidden pointer-events-none active:scale-95 active:transform transition-transform'>
                        <div className='absolute w-full h-full flex items-center justify-center z-10'>
                            <CardTitle className='text-white shadow'>
                                {space.name}
                            </CardTitle>
                        </div>
                        <Image
                            src={`https://img.youtube.com/vi/${space.background}/maxresdefault.jpg`}
                            width={320}
                            height={180}
                            alt="Video Thumbnail"
                            className='hover:transform hover:scale-105 transition-transform pointer-events-auto'
                        />
                    </Card>
                </button>
                </Link>
            ))}
        </div>
    );
}
