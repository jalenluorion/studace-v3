import { ResetPassword } from '@/components/auth/reset-form';

import { getAuthUser } from '@/lib/supabase/user';

type Message = { success: string } | { error: string } | { message: string };

export default async function Login(props: { searchParams: Promise<Message> }) {
    const searchParams = await props.searchParams;

    await getAuthUser()

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <ResetPassword
                searchParams={searchParams}
            />
        </div>
    );
}
