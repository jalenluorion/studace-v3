'use client'

import Link from 'next/link';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { SubmitButton } from '@/components/auth/submit-button';
import { signIn } from '@/lib/supabase/auth';

export function LoginForm() {
    const [error, setError] = useState<string | null>(null);

    function runButton(formData: FormData) {
        signIn(formData)
            .then((res) => {
                if (res.message && res.message !== 'NEXT_REDIRECT') {
                    setError(res.message);
                }
            }
        );
    }
    
    return (
        <Card className="mx-auto w-full sm:w-96">
            <CardHeader>
                <CardTitle className="text-2xl">Welcome Back!</CardTitle>
                <CardDescription>Log in to Studace</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label
                                htmlFor="email"
                            >
                                Email or Username
                            </Label>
                            <Input
                                name="email or username"
                                type="text"
                                placeholder="you@example.com or john_doe"
                                required
                                className={error ? 'border-red-500' : ''}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label
                                    htmlFor="password"
                                >
                                    Password
                                </Label>
                                <Link
                                    href="/forgot-password"
                                    className="ml-auto inline-block text-sm underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                name="password"
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
                        <SubmitButton formAction={runButton} pendingText="Signing In...">
                            Login
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
                            Login with Google
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="underline">
                            Sign up
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
