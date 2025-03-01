import { ForgotPassword } from '@/components/auth/reset-form';
import { getAuthUser } from '@/lib/supabase/user';
import { redirect } from 'next/navigation';

type Message = { success: string } | { error: string } | { message: string };

export default async function Login(props: { searchParams: Promise<Message> }) {
    const searchParams = await props.searchParams;

    const user = await getAuthUser(null)
        .catch(() => {
            return null;
        });

    if (user) {
        return redirect('/home');
    }

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <ForgotPassword 
                searchParams={searchParams}
            />
        </div>
    );
}
