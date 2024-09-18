import AuthButton from '@/components/auth/AuthButton';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }

    return (
        <div className="flex w-full flex-1 flex-col items-center gap-20">
            <div className="w-full">
                <div className="bg-purple-950 py-6 text-center font-medium text-white">
                    This is a protected page that you can only see as an authenticated user
                </div>
                <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
                    <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
                        <AuthButton />
                    </div>
                </nav>
            </div>

            <div className="flex max-w-4xl flex-1 flex-col gap-20 px-3">
                <main className="flex flex-1 flex-col gap-6">
                    <h2 className="mb-4 text-2xl font-bold">Next steps</h2>
                </main>
            </div>

            <footer className="flex w-full justify-center border-t border-t-foreground/10 p-8 text-center text-xs">
                <p>
                    Powered by{' '}
                    <a
                        href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                        target="_blank"
                        className="font-bold hover:underline"
                        rel="noreferrer"
                    >
                        Supabase
                    </a>
                </p>
            </footer>
        </div>
    );
}
