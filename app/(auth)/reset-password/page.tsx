import { ResetPassword } from '@/components/auth/reset-form';

import { getAuthUser } from '@/lib/supabase/user';

export default async function Login() {
    await getAuthUser()

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <ResetPassword/>
        </div>
    );
}
