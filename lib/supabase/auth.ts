'use server';

import { createClient } from "@/lib/supabase/server";
import { getEmail } from "@/lib/supabase/user";
import { encodedRedirect, encodedRedirectMultipleTypes } from "@/lib/utils";
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
        return encodedRedirect('error', '/login', 'Invalid Credentials');
    }

    return redirect('/home');
};

export const signUp = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const supabase = await createClient();
    const origin = (await headers()).get("origin");

    if (!email || !password) {
      return { error: "Email and password are required" };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return encodedRedirect("error", "/signup", "Error trying to sign up");
    } else {
      return encodedRedirect(
        "success",
        "/signup",
        "Thanks for signing up! Please check your email for a verification link.",
      );
    }
};

export const registerAccount = async (formData: FormData) => {
    const supabase = await createClient();

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

export const forgotPassword = async (formData: FormData) => {
    const email = formData.get('email')?.toString();
    const supabase = await createClient();
    const origin = (await headers()).get('origin');
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

export const resetPassword = async (formData: FormData) => {
    const supabase = await createClient();

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