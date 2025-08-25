import { getSchools } from '@/lib/supabase/school';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
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
            <SidebarInset>
                <div className="w-full">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
