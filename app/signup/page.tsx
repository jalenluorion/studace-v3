import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import Link from 'next/link';
import { SubmitButton } from '../../components/auth/forms/submit-button';
import { Input } from '@/components/auth/forms/input';
import { Label } from '@/components/auth/forms/label';
import { FormMessage, Message } from '@/components/auth/forms/form-message';
import { encodedRedirect } from '@/lib/utils';
import { registerProfile } from '@/lib/supabase/user';

export default function Signup({ searchParams }: { searchParams: Message }) {
    const signUp = async (formData: FormData) => {
        'use server';
        const firstName = formData.get('First Name')?.toString();
        const lastName = formData.get('Last Name')?.toString();
        const username = formData.get('username')?.toString();
        const email = formData.get('email')?.toString();
        const password = formData.get('password')?.toString();
        const supabase = createClient();
        const origin = headers().get('origin');

        if (!email || !password || !firstName || !lastName || !username) {
            return { error: 'Fill in all required fields' };
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${origin}/auth/callback`,
                data: {
                    firstName,
                    lastName,
                    username,
                },
            },
        });

        if (error) {
            return encodedRedirect('error', '/signup', 'Error trying to sign up');
        } else {
            try {
                await registerProfile();
            } catch (error) {
                return encodedRedirect('error', '/signup', 'Error trying to create profile');
            }

            return encodedRedirect(
                'success',
                '/signup',
                'Thanks for signing up! Please check your email for a verification link.',
            );
        }
    };

    if ('message' in searchParams) {
        return (
            <div className="flex h-screen w-full flex-1 items-center justify-center gap-2 p-4 sm:max-w-md">
                <FormMessage message={searchParams} />
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full flex-1 items-center justify-center gap-2 p-4 sm:max-w-md">
            <Link
                href="/"
                className="bg-btn-background hover:bg-btn-background-hover group absolute left-8 top-8 flex items-center rounded-md px-4 py-2 text-sm text-foreground no-underline"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                >
                    <polyline points="15 18 9 12 15 6" />
                </svg>{' '}
                Back
            </Link>

            <form className="flex w-full max-w-md flex-col justify-center gap-2 text-foreground [&>input]:mb-6">
                <h1 className="text-2xl font-medium">Sign up</h1>
                <p className="text text-sm text-foreground/60">
                    Already have an account?{' '}
                    <Link className="font-medium text-blue-600 underline" href="/login">
                        Log in
                    </Link>
                </p>
                <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
                    <div className="flex gap-2 [&>input]:mb-3">
                        <div>
                            <Label htmlFor="First Name">First Name</Label>
                            <Input name="First Name" placeholder="John" required />
                        </div>
                        <div>
                            <Label htmlFor="Last Name">Last Name</Label>
                            <Input name="Last Name" placeholder="Doe" required />
                        </div>
                    </div>
                    <Label htmlFor="username">Username</Label>
                    <Input name="username" placeholder="johndoe" required />
                    <Label htmlFor="email">Email</Label>
                    <Input name="email" placeholder="you@example.com" required />
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" name="password" placeholder="••••••••" required />
                    <SubmitButton formAction={signUp} pendingText="Signing up...">
                        Sign up
                    </SubmitButton>
                </div>
                <FormMessage message={searchParams} />
            </form>
        </div>
    );
}
