import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getSchools } from '@/lib/supabase/school';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/sidebar';
import { getProfile } from '@/lib/supabase/user';

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }

    const schools = await getSchools(user.id);
    const profile = await getProfile(user.id);

    return (
        <SidebarProvider>
            <AppSidebar 
                profile={profile}
                schools={schools}
            />
            <main className="h-screen w-full">{children}</main>
        </SidebarProvider>
    );
}
