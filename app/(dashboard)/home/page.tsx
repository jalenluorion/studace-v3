import { Suspense } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getAuthUser, getSpaces } from '@/lib/supabase/user';
import { Skeleton } from "@/components/ui/skeleton";
import SpaceList from "@/components/dashboard/spaces";

export default async function Home() {
    return (
        <div className="flex-1 overflow-auto flex flex-col">
            <header className="flex items-center gap-2 border-b p-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold">My Spaces</h1>
            </header>
            <div className="p-6 flex-1">
              <Suspense fallback={<SpaceLoader />}>
                < HomeMain />
              </Suspense>
            </div>
        </div>
    );
}

async function HomeMain() {
    const user = await getAuthUser();
    
    const spaces = await getSpaces(user.id);

    return( 
      <SpaceList spaces={spaces} /> 
    );
}

 async function SpaceLoader() {
  return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="w-full aspect-video" />
          ))}
      </div>
  );
}