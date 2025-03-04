'use client'

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { SubmitButton } from '@/components/auth/submit-button';
import { signUp } from '@/lib/supabase/auth';

export function RegisterForm() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    function runButton(formData: FormData) {
        signUp(formData)
            .then((res) => {
                if (typeof res === 'object' && 'message' in res) {
                    setError(res.message);
                    setSuccess(null);
                } else if (res) {
                    setError(null);
                    setSuccess(res);
                }
            });
    }

    return (
        <Card className="mx-auto w-full sm:w-96">
            <CardHeader>
                <CardTitle className="text-2xl">Welcome!</CardTitle>
                <CardDescription>Create an account at Studace</CardDescription>
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
                        <div className="grid gap-2">
                            <Label
                                htmlFor="password"
                            >
                                Password
                            </Label>
                            <Input
                                name="password"
                                placeholder="••••••••"
                                type="password"
                                required
                                className={error ? 'border-red-500' : ''}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label
                                htmlFor="confirmPassword"
                            >
                                Confirm Password
                            </Label>
                            <Input
                                name="confirmPassword"
                                placeholder="••••••••"
                                type="password"
                                required
                                className={error ? 'border-red-500' : ''}
                            />
                        </div>
                        {success && (
                            <Label className="text-green-500 text-center">
                                {success}
                            </Label>
                        )}
                        {error && (
                            <Label className="text-red-500 text-center">
                                {error}
                            </Label>
                        )}
                        <SubmitButton formAction={runButton} pendingText="Signing Up...">
                            Sign Up
                        </SubmitButton>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t"></span>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full">
                            Sign Up with Google
                        </Button>
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