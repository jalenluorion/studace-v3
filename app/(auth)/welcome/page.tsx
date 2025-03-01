import { WelcomeForm } from "@/components/auth/create-form";
import { isRegistered } from "@/lib/supabase/user";

type Errors = { usernameError: string } | { passwordError: string } | { dateError: string };

export default async function Welcome(
    props: { searchParams: Promise<{code: string; redirectTo: string} | Errors> }
) {
    const searchParams = await props.searchParams;
    
    await isRegistered()

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <WelcomeForm searchParams={searchParams} />
        </div>
    );
}
