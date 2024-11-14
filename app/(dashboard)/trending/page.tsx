import SpaceList, { SpaceLoader } from "@/components/dashboard/spaces";
import { Suspense } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default async function Home() {
    return (
        <div className="flex-1 overflow-auto flex flex-col">
            <header className="flex items-center gap-2 border-b p-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold">Trending Spaces</h1>
            </header>
            <div className="p-6 flex-1">
              <Suspense fallback={<SpaceLoader />}>
              </Suspense>
            </div>
        </div>
    );
}
