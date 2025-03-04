'use server';

import { createClient } from "@/lib/supabase/server";
import { getEmail, registerProfile } from "@/lib/supabase/user";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signIn = async (formData: FormData) => {
    let email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = await createClient();

    if (email && !email.includes('@')) {
        const result = await getEmail(email);
        if (result) {
            email = result;
        }
    }

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return {message: 'Invalid Credentials'};
    }

    return redirect('/home');
};

export const signUp = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirmPassword")?.toString();
    const supabase = await createClient();
    const origin = (await headers()).get("origin");

    if (!email || !password) {
        return {message: 'Email and password are required'};
    }

    if (password !== confirmPassword) {
        return {message: 'Passwords do not match'};
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback?redirect_to=/welcome`,
      },
    });

    if (error) {
        if (error.status === 429) {
            return {message: 'Too many requests. Please try again later'};
        }
        if (error.status === 422) {
            return {message: 'Password must be at least 6 characters'};
        }
        return {message: 'Error trying to sign up. Please try again later'};
    } else {
        return 'Verification link successfully sent';
    }
};

export const registerAccount = async (formData: FormData) => {
    const supabase = await createClient();

    const username = formData.get('username')!.toString();
    const firstName = formData.get('firstName')!.toString();
    const lastName = formData.get('lastName')!.toString();
    const birthday = formData.get('birthday')!.toString();

    // check if username is unique
    const { data } = await supabase.from('profile').select('username').eq('username', username);
    if (data && data.length > 0) {
        return {message: 'Username already exists'};
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
        return {message: 'You must be at least 13 years old'};
    }

    const newSpace = await registerProfile(firstName, lastName, username, birthday)
        .catch(() => {
            return {message: 'Error creating profile. Please try again later'};
        }
    );

    return redirect(`/space/${newSpace}`);
}

export const forgotPassword = async (formData: FormData) => {
    const email = formData.get('email')?.toString();
    const supabase = await createClient();
    const origin = (await headers()).get('origin');

    if (!email) {
        return {message: 'Email is required'};
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/callback?redirect_to=/reset-password`,
    });

    if (error) {
        if (error.status === 429) {
            return {message: 'Too many requests. Please try again later'};
        }
        return {message: 'Error sending password reset link'};
    }
    
    return 'Password reset link successfully sent'
};

// TODO: Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.
export const resetPassword = async (formData: FormData) => {
    const supabase = await createClient();

    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (!password || !confirmPassword) {
        return {message: 'Password and confirm password are required'};
    }

    if (password !== confirmPassword) {
        return {message: 'Passwords do not match'};
    }

    const { error } = await supabase.auth.updateUser({
        password: password,
    });

    if (error) {
        if (error.status === 422) {
            if (error.message.includes('old password')) {
                return {message: 'New password cannot be existing password'};
            } else if (error.message.includes('6')) {
                return {message: 'Password must be at least 6 characters'};
            } else {
                return {message: 'Weak password. Please try again'};
            }
        }
        return {message: 'Password update failed. Please try again later'};
    }

    return 'Password successfully updated';
};