import { FormMessage, Message } from '@/components/auth/forms/form-message';
import { Input } from '@/components/auth/forms/input';
import { Label } from '@/components/auth/forms/label';
import { SubmitButton } from '@/components/auth/forms/submit-button';
import { createClient } from '@/lib/supabase/server';
import { encodedRedirect } from '@/lib/utils';

export default async function ResetPassword({ searchParams }: { searchParams: Message }) {
    const resetPassword = async (formData: FormData) => {
        'use server';
        const supabase = createClient();

        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (!password || !confirmPassword) {
            encodedRedirect(
                'error',
                '/protected/reset-password',
                'Password and confirm password are required',
            );
        }

        if (password !== confirmPassword) {
            encodedRedirect('error', '/protected/reset-password', 'Passwords do not match');
        }

        const { error } = await supabase.auth.updateUser({
            password: password,
        });

        if (error) {
            encodedRedirect('error', '/protected/reset-password', 'Password update failed');
        }

        encodedRedirect('success', '/protected/reset-password', 'Password updated');
    };

    return (
        <div className="flex w-full flex-1 flex-col items-center justify-center">
            <form className="flex w-full max-w-md flex-col gap-2 p-4 [&>input]:mb-4">
                <h1 className="text-2xl font-medium">Reset password</h1>
                <p className="text-sm text-foreground/60">Please enter your new password below.</p>

                <Label htmlFor="password">New password</Label>
                <Input type="password" name="password" placeholder="New password" required />
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    required
                />
                <SubmitButton formAction={resetPassword}>Reset password</SubmitButton>
                <FormMessage message={searchParams} />
            </form>
        </div>
    );
}
