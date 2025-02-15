import { WelcomeForm } from "@/components/auth/create-form";

type Errors = { usernameError: string } | { passwordError: string } | { dateError: string };

export default async function Welcome(
    props: { searchParams: Promise<{code: string; redirectTo: string} | Errors> }
) {
    const searchParams = await props.searchParams;
    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <WelcomeForm searchParams={searchParams} />
        </div>
    );
}
