import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { SubmitButton } from '@/components/auth/submit-button';
import { signUp } from '@/lib/supabase/auth';

type Message = { success: string } | { error: string } | { message: string };

export function RegisterForm({ searchParams }: { searchParams: Message }) {
    return (
        <Card className="mx-auto w-full sm:w-96">
            <CardHeader>
                <CardTitle className="text-2xl">Welcome!</CardTitle>
                <CardDescription>Create an account at Studace.live</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label
                                htmlFor="email"
                                className={'error' in searchParams ? 'text-red-500' : ''}
                            >
                                Email Address{' '}
                                {'error' in searchParams ? '- ' + searchParams.error : ''}
                            </Label>
                            <Input
                                name="email"
                                type="text"
                                placeholder="you@example.com"
                                required
                                className={'error' in searchParams ? 'border-red-500' : ''}
                            />
                        </div>
                        <SubmitButton formAction={signUp} pendingText="Registering...">
                            Register
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
                            Register with Google
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
