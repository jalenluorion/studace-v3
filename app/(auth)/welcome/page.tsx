import { WelcomeForm } from "@/components/auth/create-form";
import { isRegistered } from "@/lib/supabase/user";

export default async function Welcome() {
    await isRegistered()

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <WelcomeForm />
        </div>
    );
}
