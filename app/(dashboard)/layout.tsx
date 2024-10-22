import Sidebar from "@/components/dashboard/sidebar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getSchools } from "@/lib/supabase/school";

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

    return (
        <div className="flex h-screen">
            <aside className="hidden w-64 border-r-2 lg:block">
                <Sidebar
                    schools={schools}
                />
            </aside>
            {children}
        </div>
    );
}
