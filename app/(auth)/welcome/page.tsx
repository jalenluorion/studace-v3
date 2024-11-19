import { WelcomeForm } from "@/components/auth/create-form";

type Errors = { usernameError: string } | { passwordError: string } | { dateError: string };

export default function Welcome({ searchParams }: { searchParams: {code: string; redirectTo: string} | Errors }) {
    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <WelcomeForm searchParams={searchParams} />
        </div>
    );
}
