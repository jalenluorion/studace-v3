import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { SubmitButton } from '@/components/auth/submit-button';
import { forgotPassword, resetPassword } from '@/lib/supabase/auth';

type Message = { success: string } | { error: string } | { message: string };

export function ForgotPassword({ searchParams }: { searchParams: Message }) {
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
