import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from '@/components/auth/forms/submit-button';
import { Label } from '@/components/auth/forms/label';
import { Input } from '@/components/auth/forms/input';
import { FormMessage, Message } from '@/components/auth/forms/form-message';
import { headers } from 'next/headers';
import { encodedRedirect } from '@/lib/utils';

export default function ForgotPassword({ searchParams }: { searchParams: Message }) {
    const forgotPassword = async (formData: FormData) => {
        'use server';

        const email = formData.get('email')?.toString();
        const supabase = createClient();
        const origin = headers().get('origin');
        const callbackUrl = formData.get('callbackUrl')?.toString();

        if (!email) {
            return encodedRedirect('error', '/forgot-password', 'Email is required');
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
        });

        if (error) {
            return encodedRedirect('error', '/forgot-password', 'Could not reset password');
        }

        if (callbackUrl) {
            return redirect(callbackUrl);
        }

        return encodedRedirect(
            'success',
            '/forgot-password',
            'Check your email for a link to reset your password.',
        );
    };

    return (
        <div className="flex w-full flex-1 flex-col items-center p-4">
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

            <form className="flex w-full max-w-md flex-1 flex-col justify-center gap-2 p-4 text-foreground [&>input]:mb-6">
                <h1 className="text-2xl font-medium">Reset Password</h1>
                <p className="text-sm text-foreground/60">
                    Already have an account?{' '}
                    <Link className="font-medium text-blue-600 underline" href="/login">
                        Log in
                    </Link>
                </p>
                <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
                    <Label htmlFor="email">Email</Label>
                    <Input name="email" placeholder="you@example.com" required />
                    <SubmitButton formAction={forgotPassword}>Reset Password</SubmitButton>
                    <FormMessage message={searchParams} />
                </div>
            </form>
        </div>
    );
}
