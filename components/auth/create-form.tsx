import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { SubmitButton } from '@/components/auth/submit-button';
import { encodedRedirectMultipleTypes } from '@/lib/utils';
import { createClient } from '@/lib/supabase/server';

type Errors = { usernameError: string } | { passwordError: string } | { dateError: string };

export function WelcomeForm({ searchParams }: { searchParams: {code: string; redirectTo: string} | Errors }) {
    const registerAccount = async (formData: FormData) => {
        'use server';

        const supabase = createClient();

        const username = formData.get('username')!.toString();
        const firstName = formData.get('firstName')!.toString();
        const lastName = formData.get('lastName')!.toString();
        const birthday = formData.get('birthday')!.toString();
        const password = formData.get('password')!.toString();
        const confirmPassword = formData.get('confirmPassword')!.toString();

        const errorMessages = [];
        // check if username is unique
        const { data } = await supabase.from('profile').select('username').eq('username', username);
        if (data && data.length > 0) {
            errorMessages.push({ type: 'usernameError', message: 'Username already exists' });
        }

        // check if password and confirmPassword match

        if (password !== confirmPassword) {
            errorMessages.push({ type: 'passwordError', message: 'Passwords do not match' });
        }

        // check if birthday is valid and user is at least 13 years old
        const today = new Date();
        const birthdate = new Date(birthday);
        let age = today.getFullYear() - birthdate.getFullYear();
        const month = today.getMonth() - birthdate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }
        if (age < 13) {
            errorMessages.push({ type: 'dateError', message: 'You must be at least 13 years old' });
        }

        if (errorMessages.length > 0) {
            return encodedRedirectMultipleTypes('/welcome', errorMessages);
        }

        
    }

    return (
        <Card className="mx-auto w-full sm:w-96">
            <CardHeader>
                <CardTitle className="text-2xl">Create an Account</CardTitle>
                <CardDescription>Welcome to Studace.live!</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label
                                htmlFor="username"
                                className={'usernameError' in searchParams ? 'text-red-500' : ''}
                            >
                                Username{' '}
                                {'usernameError' in searchParams ? '- ' + searchParams.usernameError : ''}
                            </Label>
                            <Input
                                name="username"
                                type="text"
                                placeholder="john_doe"
                                required
                                className={'usernameError' in searchParams ? 'border-red-500' : ''}
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
                                    className="flex-1"
                                />
                                </div>
                                <div>
                            <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    name="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    required
                                    className="flex-1"
                                />
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label
                                htmlFor="birthday"
                                className={'dateError' in searchParams ? 'text-red-500' : ''}
                            >
                                Birthday{' '}
                                {'dateError' in searchParams ? '- ' + searchParams.dateError : ''}
                            </Label>
                            <Input
                                name="birthday"
                                type="date"
                                required
                                className={'dateError' in searchParams ? 'border-red-500' : ''}
                            />
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label
                                    htmlFor="password"
                                    className={'passwordError' in searchParams ? 'text-red-500' : ''}
                                >
                                    Password{' '}
                                    {'passwordError' in searchParams ? '- ' + searchParams.passwordError : ''}
                                </Label>
                            </div>
                            <Input
                                name="password"
                                placeholder="••••••••"
                                type="password"
                                required
                                className={'passwordError' in searchParams ? 'border-red-500' : ''}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label
                                    htmlFor="confirmPassword"
                                    className={'passwordError' in searchParams ? 'text-red-500' : ''}
                                >
                                    Confirm Password{' '}
                                    {'passwordError' in searchParams ? '- ' + searchParams.passwordError : ''}
                                </Label>
                            </div>
                            <Input
                                name="confirmPassword"
                                placeholder="••••••••"
                                type="password"
                                required
                                className={'passwordError' in searchParams ? 'border-red-500' : ''}
                            />
                        </div>
                        <SubmitButton formAction={registerAccount} pendingText="Registering...">
                            Register
                        </SubmitButton>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}