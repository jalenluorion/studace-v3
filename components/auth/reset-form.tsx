import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from '@/components/auth/submit-button';
import { encodedRedirect } from '@/lib/utils';
import { getEmail } from '@/lib/supabase/user';
import { headers } from 'next/headers';

type Message = { success: string } | { error: string } | { message: string };

export function ForgotPassword({ searchParams }: { searchParams: Message }) {
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
            redirectTo: `${origin}/auth/callback?redirect_to=/reset-password`,
        });

        if (error) {
            return encodedRedirect('error', '/forgot-password', 'Invalid email');
        }

        if (callbackUrl) {
            return redirect(callbackUrl);
        }

        return encodedRedirect(
            'success',
            '/forgot-password',
            'Password reset link successfully sent',
        );
    };

    return (
        <Card className="mx-auto w-full sm:w-96">
            <CardHeader>
                <CardTitle className="text-2xl">Reset Password</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label
                                htmlFor="email"
                                className={
                                    'error' in searchParams
                                        ? 'text-red-500'
                                        : 'success' in searchParams
                                          ? 'text-green-500'
                                          : ''
                                }
                            >
                                Email {'error' in searchParams ? '- ' + searchParams.error : ''}
                                {'success' in searchParams ? '- ' + searchParams.success : ''}
                            </Label>
                            <Input
                                name="email"
                                type="text"
                                placeholder="you@example.com"
                                required
                                className={'error' in searchParams ? 'border-red-500' : ''}
                            />
                        </div>
                        <SubmitButton formAction={forgotPassword} pendingText="Sending...">
                            Reset Password
                        </SubmitButton>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="underline">
                            Login
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export function ResetPassword({ searchParams }: { searchParams: Message }) {
    const resetPassword = async (formData: FormData) => {
        'use server';
        const supabase = createClient();

        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (!password || !confirmPassword) {
            encodedRedirect(
                'error',
                '/reset-password',
                'Password and confirm password are required',
            );
        }

        if (password !== confirmPassword) {
            encodedRedirect('error', '/reset-password', 'Passwords do not match');
        }

        const { error } = await supabase.auth.updateUser({
            password: password,
        });

        if (error) {
            encodedRedirect('error', '/reset-password', 'Password update failed');
        }

        encodedRedirect('success', '/reset-password', 'Password updated');
    };

    return (
        <Card className="mx-auto w-full sm:w-96">
            <CardHeader>
                <CardTitle className="text-2xl">Reset Password</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label
                                    htmlFor="password"
                                    className={
                                        'error' in searchParams
                                            ? 'text-red-500'
                                            : 'success' in searchParams
                                              ? 'text-green-500'
                                              : ''
                                    }
                                >
                                    New Password{' '}
                                    {'error' in searchParams ? '- ' + searchParams.error : ''}
                                    {'success' in searchParams ? '- ' + searchParams.success : ''}
                                </Label>
                            </div>
                            <Input
                                name="password"
                                placeholder="••••••••"
                                type="password"
                                required
                                className={'error' in searchParams ? 'border-red-500' : ''}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label
                                    htmlFor="password"
                                    className={
                                        'error' in searchParams
                                            ? 'text-red-500'
                                            : 'success' in searchParams
                                              ? 'text-green-500'
                                              : ''
                                    }
                                >
                                    Confirm Password{' '}
                                    {'error' in searchParams ? '- ' + searchParams.error : ''}
                                    {'success' in searchParams ? '- ' + searchParams.success : ''}
                                </Label>
                            </div>
                            <Input
                                name="confirmPassword"
                                placeholder="••••••••"
                                type="password"
                                required
                                className={'error' in searchParams ? 'border-red-500' : ''}
                            />
                        </div>
                        <SubmitButton formAction={resetPassword} pendingText="Signing In...">
                            Reset Password
                        </SubmitButton>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
