import { getSchools } from '@/lib/supabase/school';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/sidebar';
import { getAuthUser, getProfile } from '@/lib/supabase/user';

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getAuthUser();

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
