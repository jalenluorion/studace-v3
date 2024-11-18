'use server';

import { createClient } from "@/lib/supabase/server";
import { getEmail } from "@/lib/supabase/user";
import { encodedRedirect } from "@/lib/utils";
import { redirect } from "next/navigation";

export const signIn = async (formData: FormData) => {

    let email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = createClient();

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