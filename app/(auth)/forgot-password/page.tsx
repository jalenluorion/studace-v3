import { ForgotPassword } from '@/components/auth/reset-form';

type Message = { success: string } | { error: string } | { message: string };

export default function Login({ searchParams }: { searchParams: Message }) {

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <ForgotPassword 
                searchParams={searchParams}
            />
        </div>
    );
}
