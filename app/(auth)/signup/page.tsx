import { RegisterForm } from '@/components/auth/signup-form';

type Message = { success: string } | { error: string } | { message: string };

export default function Login({ searchParams }: { searchParams: Message }) {

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <RegisterForm 
                searchParams={searchParams}
            />
        </div>
    );
}
