import { LoginForm } from '@/components/auth/login-form';

type Message = { success: string } | { error: string } | { message: string };

export default async function Login(props: { searchParams: Promise<Message> }) {
    const searchParams = await props.searchParams;

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <LoginForm 
                searchParams={searchParams}
            />
        </div>
    );
}
