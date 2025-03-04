import { RegisterForm } from '@/components/auth/signup-form';
import { getAuthUser } from '@/lib/supabase/user';
import { redirect } from 'next/navigation';

export default async function Login() {
    const user = await getAuthUser(null)
        .catch(() => {
            return null;
        });

    if (user) {
        return redirect('/home');
    }

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <RegisterForm />
        </div>
    );
}
