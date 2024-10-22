'use client';

import { PlusCircle } from 'lucide-react';
import { Toggle } from '../ui/toggle';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getSchools } from '@/lib/supabase/school';
import { Database, Tables, Enums } from '@/database.types';

export default function Sidebar({
    schools,
}: {
    schools: Tables<'school'>[];
}) {
    const pathname = usePathname();

    return (
        <div className="flex h-full flex-col p-2">
            <div className="p-2">
                <h2 className="mb-4 text-lg font-semibold">Studace.Live</h2>
                <Button className="mb-4 w-full" variant="default">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Space
                </Button>
                <nav className="space-y-2">
                    <Link href={`/home`} prefetch={true}>
                        <Toggle
                            className="w-full justify-start"
                            data-state={pathname === '/home' ? 'on' : 'off'}
                        >
                            My Spaces
                        </Toggle>
                    </Link>
                    {schools.length > 0 ? (
                        <div>
                            {schools.map((school) => (
                                <div key={school.school_id} className="my-2">
                                    <Link href={`/school/${school.school_id}`} prefetch={true}>
                                        <Toggle
                                            className="w-full justify-start"
                                            data-state={
                                                pathname === `/school/${school.school_id}` ? 'on' : 'off'
                                            }
                                        >
                                            {school.name}
                                        </Toggle>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </nav>
            </div>
            <div className="flex-grow"></div>
            <Toggle className="flex h-auto items-center justify-start p-2">
                <Avatar className="h-10 w-10">
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start ml-2">
                    <div className="font-semibold">John Doe</div>
                    <div className="text-green-500">Online</div>
                </div>
            </Toggle>
        </div>
    );
}
