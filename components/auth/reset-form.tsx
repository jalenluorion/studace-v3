'use client'

import Link from 'next/link';
import { useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { SubmitButton } from '@/components/auth/submit-button';
import { forgotPassword, resetPassword } from '@/lib/supabase/auth';

export function ForgotPassword() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    function runButton(formData: FormData) {
        forgotPassword(formData)
            .catch((error) => {
                setError(error.message);
            })
            .then((message) => {
                if (message) {
                    setError(null);
                    setSuccess(message);
                }
            });
    }

    return (
        <Card className="mx-auto w-full sm:w-96">
            <CardHeader>
                <CardTitle className="text-2xl">Forgot Password</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label
                                htmlFor="email"
                            >
                                Email
                            </Label>
                            <Input
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                className={error ? 'border-red-500' : ''}
                            />
                        </div>
                        {error && (
                            <Label className="text-red-500 text-center">
                                {error}
                            </Label>
                        )}
                        {success && (
                            <Label className="text-green-500 text-center">
                                {success}
                            </Label>
                        )}
                        <SubmitButton formAction={runButton} pendingText="Sending...">
                            Send Reset Link
                        </SubmitButton>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Remembered your password?{' '}
                        <Link href="/login" className="underline">
                            Login
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export function ResetPassword() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    function runButton(formData: FormData) {
        resetPassword(formData)
            .catch((error) => {
                setError(error.message);
            })
            .then((message) => {
                if (message) {
                    setError(null);
                    setSuccess(message);
                }
            });
    }

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
                                >
                                    New Password
                                </Label>
                            </div>
                            <Input
                                name="password"
                                placeholder="••••••••"
                                type="password"
                                required
                                className={error ? 'border-red-500' : ''}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label
                                    htmlFor="confirmPassword"
                                >
                                    Confirm Password
                                </Label>
                            </div>
                            <Input
                                name="confirmPassword"
                                placeholder="••••••••"
                                type="password"
                                required
                                className={error ? 'border-red-500' : ''}
                            />
                        </div>
                        {error && (
                            <Label className="text-red-500 text-center">
                                {error}
                            </Label>
                        )}
                        {success && (
                            <Label className="text-green-500 text-center">
                                {success}
                            </Label>
                        )}
                        <SubmitButton formAction={runButton} pendingText="Resetting...">
                            Reset Password
                        </SubmitButton>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}