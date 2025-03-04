'use client'

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { SubmitButton } from '@/components/auth/submit-button';
import { registerAccount } from '@/lib/supabase/auth';

export function WelcomeForm() {
    const [error, setError] = useState<string | null>(null);

    function runButton(formData: FormData) {
        registerAccount(formData)
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
                <CardTitle className="text-2xl">Create an Account</CardTitle>
                <CardDescription>Welcome to Studace!</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label
                                htmlFor="username"
                            >
                                Username
                            </Label>
                            <Input
                                name="username"
                                type="text"
                                placeholder="john_doe"
                                required
                                className={error ? 'border-red-500' : ''}
                            />
                        </div>

                        <div className="grid gap-2">
                            <div className="flex gap-2">
                                <div>
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        name="firstName"
                                        type="text"
                                        placeholder="John"
                                        required
                                        className={error ? 'border-red-500 flex-1' : 'flex-1'}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        name="lastName"
                                        type="text"
                                        placeholder="Doe"
                                        required
                                        className={error ? 'border-red-500 flex-1' : 'flex-1'}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label
                                htmlFor="birthday"
                            >
                                Birthday
                            </Label>
                            <Input
                                name="birthday"
                                type="date"
                                required
                                className={error ? 'border-red-500' : ''}
                            />
                        </div>
                        {error && (
                            <Label className="text-red-500 text-center">
                                {error}
                            </Label>
                        )}
                        <SubmitButton formAction={runButton} pendingText="Registering...">
                            Register
                        </SubmitButton>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
