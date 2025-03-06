import { Suspense } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { getGlobalSettings } from "@/lib/supabase/globals";

import DiscoverList from "@/components/dashboard/discover";

export default async function Home() {
    return (
        <div className="flex-1 overflow-auto flex flex-col">
            <header className="flex items-center gap-2 border-b p-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold">Discover Spaces</h1>
            </header>
            <div className="p-6 flex-1">
              <Suspense fallback={<SpaceLoader />}>
                < DiscoverMain />
              </Suspense>
            </div>
        </div>
    );
}

export async function DiscoverMain() {            
    const globalSettings = await getGlobalSettings();
    
    return( 
      <DiscoverList categories={globalSettings.categories} /> 
    );
}

export async function SpaceLoader() {
  return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="w-full aspect-video" />
          ))}
      </div>
  );
}
