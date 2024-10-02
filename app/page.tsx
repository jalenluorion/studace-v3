import AuthButton from '@/components/auth/AuthButton';
import { getSpaces } from '@/lib/supabase/user';
import { fetchModules } from '@/lib/supabase/modules';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';

export default async function Home() {

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return (
            <div className="m-2">
                <AuthButton />
            </div>
        );
    }

    const spaces = await getSpaces(user.id);

    return (
        <div className="m-2">
            <AuthButton />
            <h1>Spaces</h1>
            <div className="flex flex-wrap">
                {spaces.map((space) => (
                    <Card key={space.space_id}>
                    <Image
                        src={`https://img.youtube.com/vi/${space.background}/maxresdefault.jpg`}
                        width={320}
                        height={180}
                        alt="Video Thumbnail"
                    />
                    </Card>
                ))}
            </div>
        </div>
    );
}
